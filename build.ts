import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

type Config = {
  colorPalettes: ColorPalette[];
  internalAliases: {
    color: string;
    nextColor: string;
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

// --- Configuration ---

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
    nextColor: '__nc',
    nextSpeed: '__ns',
    padding: '__padding',
  },
  aliasPrefix: 'rainbow_crosshair',
  outDir: path.join(import.meta.dir, 't1ckbase_rainbow_crosshair'),
  aliasesPerFile: 120,
  maxSpeed: 30,
};

// --- Build Logic ---

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

async function build(config: Config) {
  const start = Bun.nanoseconds();
  console.log(`Building to \x1b[93m${config.outDir}\x1b[0m`);
  ensureCleanDir(config.outDir);

  const { color: C, nextColor: NC, nextSpeed: NS, padding: P } = config.internalAliases;
  const prefix = config.aliasPrefix;
  const outBase = path.basename(config.outDir);
  const version = (await Bun.$`git describe --tags --always --dirty`.text()).trim();
  console.log(`  - Version: ${version}`);

  // 1. Generate Color Palettes
  const paletteLoadCommands: string[] = [];

  for (const palette of config.colorPalettes) {
    console.log(`  - Generating palette: ${palette.name} (${palette.steps} steps)`);
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
      const nextIndex = (i + 1) % palette.steps;

      return `alias ${C}${i} "cl_crosshaircolor_r ${r}; cl_crosshaircolor_g ${g}; cl_crosshaircolor_b ${b};alias ${NC} ${C}${nextIndex}"`;
    });

    const chunks = chunk(aliases, config.aliasesPerFile);

    // Write palette chunks
    await Promise.all(
      chunks.map((lines, i) => Bun.write(path.join(paletteDir, `${i}.cfg`), lines.join('\n')))
    );

    // Write load.cfg for this palette
    const loadContent = [
      `echoln "[RainbowCrosshair] Loading color palette: '${palette.name}' (${palette.steps} colors)"`,
      '',
      ...chunks.map((_, i) => `exec ${outBase}/${palette.name}/${i}`),
    ].join('\n');
    await Bun.write(path.join(paletteDir, 'load.cfg'), loadContent);

    // Register global load alias
    paletteLoadCommands.push(`alias ${prefix}_load_${palette.name} "exec ${outBase}/${palette.name}/load"`);
  }

  // 2. Generate color_palettes.cfg
  await Bun.write(path.join(config.outDir, 'color_palettes.cfg'), paletteLoadCommands.join('\n'));

  // 3. Generate speed.cfg (Dynamic Speed Generation)
  console.log(`  - Generating speed config (Max: ${config.maxSpeed})`);
  const speedLines: string[] = [];

  // Padding logic: __ns (Next Speed) executes the current padding alias
  speedLines.push(`// Padding mechanism`);
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
    speedLines.push(`alias ${prefix}_speed_${i} "alias ${P} __p${i}; alias ${NS} __p${i}; echoln [RainbowCrosshair] Speed set to ${i}"`);
  }

  await Bun.write(path.join(config.outDir, 'speed.cfg'), speedLines.join('\n'));

  // 4. Generate enable.cfg
  console.log(`  - Generating enable.cfg`);
  const enableContent = [
    `bind mouse_x "${NS}; yaw"`,
    `bind mouse_y "${NS}; pitch"`,
    `cl_crosshaircolor 5`, // Custom color mode
    '',
    `echoln "[RainbowCrosshair] Enabled"`,
  ].join('\n');
  await Bun.write(path.join(config.outDir, 'enable.cfg'), enableContent);

  // 5. Generate disable.cfg
  console.log(`  - Generating disable.cfg`);
  const disableContent = [`bind mouse_x yaw`, `bind mouse_y pitch`, '', `echoln "[RainbowCrosshair] Disabled"`].join('\n');
  await Bun.write(path.join(config.outDir, 'disable.cfg'), disableContent);

  // 6. Generate init.cfg
  console.log(`  - Generating init.cfg`);
  const initContent = [
    `// https://github.com/T1ckbase/cs2-rainbow-crosshair`,
    '',
    `echoln "[RainbowCrosshair] Initializing (${version})"`,
    '',
    `exec ${outBase}/color_palettes`,
    `exec ${outBase}/speed`,
    '',
    `// Initialize next color alias`,
    `alias ${NC} ${C}0`,
    '',
    `// Toggle Logic`,
    `alias ${prefix}_enable "exec ${outBase}/enable; alias ${prefix}_toggle ${prefix}_toggle_disable"`,
    `alias ${prefix}_disable "exec ${outBase}/disable; alias ${prefix}_toggle ${prefix}_toggle_enable"`,
    '',
    `alias ${prefix}_toggle_enable "${prefix}_enable; alias ${prefix}_toggle ${prefix}_toggle_disable"`,
    `alias ${prefix}_toggle_disable "${prefix}_disable; alias ${prefix}_toggle ${prefix}_toggle_enable"`,
    `alias ${prefix}_toggle "${prefix}_toggle_enable"`,
    '',
    `// Defaults`,
    `${prefix}_load_oklch`,
    `${prefix}_speed_10`,
    '',
    `echoln "[RainbowCrosshair] Initialization Complete"`,
  ].join('\n');
  await Bun.write(path.join(config.outDir, 'init.cfg'), initContent);

  const end = Bun.nanoseconds();
  const time = (end - start) / 1000000;
  console.log(`Build Complete! \x1b[95m(${time.toFixed(2)}ms)\x1b[0m`);
}

// Run Build
await build(config);
