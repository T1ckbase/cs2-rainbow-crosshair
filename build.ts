import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

type Config = {
  colorPalettes: ColorPalette[];
  internalAliases: {
    color: string;
    hudColor: string;
    hudSync: string;
    nextColor: string;
    noop: string;
    nextSpeed: string; // Internal alias for speed chain
    padding: string; // Internal alias for padding chain
  };
  aliasPrefix: string;
  outDir: string;
  aliasesPerFile: number;
  maxSpeed: number; // Maximum speed setting (e.g. 30)
};

type ColorPalette = {
  name: string;
  steps: number;
  /**
   * Returns a CSS color string for a given hue (0-360).
   * @param hue The hue value (0-360).
   */
  fn: (hue: number) => Bun.ColorInput;
};

// Configuration

const config: Config = {
  colorPalettes: [
    {
      name: 'oklch',
      steps: 360,
      fn: (h) => `oklch(75% 0.1275 ${h})`,
    },
    {
      name: 'hsl',
      steps: 360,
      fn: (h) => `hsl(${h} 100% 50%)`,
    },
    // Custom palette:
    // {
    //   name: 'random',
    //   steps: 120,
    //   fn: () => `rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`,
    // },
  ],
  internalAliases: {
    color: '__c',
    hudColor: '__hc',
    hudSync: '__hud',
    nextColor: '__nc',
    noop: '__noop',
    nextSpeed: '__ns',
    padding: '__padding',
  },
  aliasPrefix: 'rainbow_crosshair',
  outDir: path.join(import.meta.dir, 't1ckbase_rainbow_crosshair'),
  aliasesPerFile: 120,
  maxSpeed: 30,
};

// Build Logic

function ensureCleanDir(dir: string) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
  mkdirSync(dir, { recursive: true });
}

function chunk<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const HUD_HUE_ID_MAP = new Map([
  [198, 3],
  [216, 4],
  [289, 5],
  [1, 6],
  [22, 7],
  [60, 8],
  [114, 9],
  [179, 10],
  [317, 11],
  [45, 12],
]);

function getHudColorId(hue: number): number {
  let nearestId = 6;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const [mappedHue, id] of HUD_HUE_ID_MAP) {
    const distance = Math.abs(hue - mappedHue);
    const circularDistance = Math.min(distance, 360 - distance);

    if (circularDistance < nearestDistance) {
      nearestDistance = circularDistance;
      nearestId = id;
    }
  }

  return nearestId;
}

async function build(config: Config) {
  const start = Bun.nanoseconds();
  console.log(`Building into \x1b[93m${config.outDir}\x1b[0m`);
  ensureCleanDir(config.outDir);

  const {
    color: C,
    hudColor: HC,
    hudSync: HS,
    nextColor: NC,
    noop: NOOP,
    nextSpeed: NS,
    padding: P,
  } = config.internalAliases;
  const prefix = config.aliasPrefix;
  const outBase = path.basename(config.outDir);
  const version = (await Bun.$`git describe --tags --always --dirty`.text()).trim();
  console.log(`  - Version: ${version}`);

  // 1. Generate Color Palettes
  const paletteLoadCommands: string[] = [];

  for (const palette of config.colorPalettes) {
    console.log(`  - Generating ${palette.name} palette (${palette.steps} steps)`);
    const paletteDir = path.join(config.outDir, palette.name);
    mkdirSync(paletteDir, { recursive: true });

    const aliases = Array.from({ length: palette.steps }, (_, i) => {
      const hue = i * (360 / palette.steps);
      const colorStr = palette.fn(hue);

      const parsed = Bun.color(colorStr, '[rgb]');

      if (!parsed) {
        throw new Error(`Failed to parse color: ${colorStr}`);
      }

      const [r, g, b] = parsed;
      const hudColorId = getHudColorId(hue);
      const nextIndex = (i + 1) % palette.steps;

      return `alias ${C}${i} "cl_crosshaircolor_r ${r}; cl_crosshaircolor_g ${g}; cl_crosshaircolor_b ${b}; alias ${HC} cl_hud_color ${hudColorId}; ${HS}; alias ${NC} ${C}${nextIndex}"`;
    });

    const chunks = chunk(aliases, config.aliasesPerFile);

    // Write palette chunks
    await Promise.all(chunks.map((lines, i) => Bun.write(path.join(paletteDir, `${i}.cfg`), lines.join('\n'))));

    // Write load.cfg for this palette
    const loadContent = [
      ...chunks.map((_, i) => `exec ${outBase}/${palette.name}/${i}`),
      '',
      `echoln "[RainbowCrosshair] Loaded '${palette.name}' palette (${palette.steps} colors)"`,
    ].join('\n');
    await Bun.write(path.join(paletteDir, 'load.cfg'), loadContent);

    // Register global load alias
    paletteLoadCommands.push(`alias ${prefix}_load_${palette.name} "exec ${outBase}/${palette.name}/load"`);
  }

  // 2. Generate color_palettes.cfg
  await Bun.write(path.join(config.outDir, 'color_palettes.cfg'), paletteLoadCommands.join('\n'));

  // 3. Generate speed.cfg (Dynamic Speed Generation)
  console.log(`  - Generating speed config (max ${config.maxSpeed})`);
  const speedLines: string[] = [];

  // Padding logic: __ns (Next Speed) executes the current padding alias
  speedLines.push('// Padding mechanism');
  speedLines.push(`alias ${NS} ${P}`);
  speedLines.push('');

  // Generate the __p1 -> __p2 -> ... chain
  const chainLength = config.maxSpeed;

  for (let i = 1; i < chainLength; i++) {
    speedLines.push(`alias __p${i} "alias ${NS} __p${i + 1}"`);
  }
  speedLines.push(`alias __p${chainLength} "${NC}; alias ${NS} ${P}"`);
  speedLines.push('');

  // Generate the speed selection aliases
  for (let i = 1; i <= config.maxSpeed; i++) {
    speedLines.push(
      `alias ${prefix}_speed_${i} "alias ${P} __p${i}; alias ${NS} __p${i}; echoln [RainbowCrosshair] Speed set to ${i}"`,
    );
  }

  await Bun.write(path.join(config.outDir, 'speed.cfg'), speedLines.join('\n'));

  // 4. Generate on.cfg
  console.log('  - Generating on.cfg');
  const onContent = [
    `bind mouse_x "${NS}; yaw"`,
    `bind mouse_y "${NS}; pitch"`,
    'cl_crosshaircolor 5', // Custom color mode
    '',
    'echoln "[RainbowCrosshair] On"',
  ].join('\n');
  await Bun.write(path.join(config.outDir, 'on.cfg'), onContent);

  // 5. Generate off.cfg
  console.log('  - Generating off.cfg');
  const offContent = ['bind mouse_x yaw', 'bind mouse_y pitch', '', `echoln "[RainbowCrosshair] Off"`].join('\n');
  await Bun.write(path.join(config.outDir, 'off.cfg'), offContent);

  // 6. Generate init.cfg
  console.log('  - Generating init.cfg');
  const initContent = [
    '// https://github.com/T1ckbase/cs2-rainbow-crosshair',
    '',
    `exec ${outBase}/color_palettes`,
    `exec ${outBase}/speed`,
    '',
    '// Initialize next color alias',
    `alias ${NC} ${C}0`,
    `alias ${NOOP} ""`,
    `alias ${HC} ${NOOP}`,
    `alias ${HS} ${NOOP}`,
    '',
    '// Toggle Logic',
    `alias ${prefix}_on "exec ${outBase}/on; alias ${prefix}_toggle ${prefix}_toggle_off"`,
    `alias ${prefix}_off "exec ${outBase}/off; alias ${prefix}_toggle ${prefix}_toggle_on"`,
    '',
    '// HUD Sync',
    `alias ${prefix}_hud_sync_on "alias ${HS} ${HC}; echoln [RainbowCrosshair] HUD sync on"`,
    `alias ${prefix}_hud_sync_off "alias ${HS} ${NOOP}; echoln [RainbowCrosshair] HUD sync off"`,
    '',
    `alias ${prefix}_toggle_on "${prefix}_on; alias ${prefix}_toggle ${prefix}_toggle_off"`,
    `alias ${prefix}_toggle_off "${prefix}_off; alias ${prefix}_toggle ${prefix}_toggle_on"`,
    `alias ${prefix}_toggle "${prefix}_toggle_on"`,
    '',
    '// Defaults',
    `${prefix}_load_hsl`,
    `${prefix}_speed_10`,
    '',
    `echoln "[RainbowCrosshair] Initialized (${version})"`,
  ].join('\n');
  await Bun.write(path.join(config.outDir, 'init.cfg'), initContent);

  const end = Bun.nanoseconds();
  const time = (end - start) / 1000000;
  console.log(`Build complete \x1b[95m(${time.toFixed(2)}ms)\x1b[0m`);
}

// Run Build
await build(config);
