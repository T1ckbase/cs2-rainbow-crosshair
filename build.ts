import { chunk } from '@std/collections';
import * as path from '@std/path';
import { emptyDirSync, ensureDirSync } from '@std/fs';
// @ts-types="@types/culori"
import { converter } from 'culori';

type Config = {
  colorPalettes: ColorPalette[];
  internalAliases: {
    color: string;
    nextColor: string;
  };
  aliasPrefix: string;
  outDir: string;
  aliasesPerFile: number;
};

type ColorPalette = {
  name: string;
  steps: number;
  /**
   * Converts hue (0-360) to RGB (0-1).
   *
   * @param hue The hue value (0-360).
   * @returns RGB object with r, g, b (0-1).
   */
  fn: (hue: number) => { r: number; g: number; b: number };
};

function buildCFG(config: Config) {
  const { color: C, nextColor: NC } = config.internalAliases;

  const generateAliases = ({ steps, fn }: ColorPalette) =>
    Array.from({ length: steps }, (_, i) => {
      const hue = i * (360 / steps);
      const color = fn(hue);
      const { r, g, b } = { r: Math.round(color.r * 255), g: Math.round(color.g * 255), b: Math.round(color.b * 255) };
      return `alias ${C}${i} "cl_crosshaircolor_r ${r}; cl_crosshaircolor_g ${g}; cl_crosshaircolor_b ${b};alias ${NC} ${C}${i + 1 == steps ? 0 : i + 1}"`;
    });

  for (const palette of config.colorPalettes) {
    if (!palette.name) throw new Error('The color palette must have a name');
    const aliases = generateAliases(palette);
    const chunks = chunk(aliases, config.aliasesPerFile);
    const palettePath = path.join(config.outDir, palette.name);
    ensureDirSync(palettePath);
    emptyDirSync(palettePath);
    for (let i = 0; i < chunks.length; i++) {
      Deno.writeTextFileSync(path.join(palettePath, `${i}.cfg`), chunks[i].join('\n'));
    }
    const loadDotCfg = `echoln "[RainbowCrosshair] Loading color palette: '${palette.name}' (${palette.steps} colors)"` +
      '\n\n' +
      `${chunks.map((_, i) => `exec ${path.basename(config.outDir)}/${palette.name}/${i}`).join('\n')}`;
    Deno.writeTextFileSync(path.join(palettePath, 'load.cfg'), loadDotCfg);
  }
  const colorPalettesDotCfg = config.colorPalettes.map(({ name }) =>
    `alias ${config.aliasPrefix}_load_${name} "exec ${path.basename(config.outDir)}/${name}/load"`
  ).join('\n');
  Deno.writeTextFileSync(path.join(config.outDir, 'color_palettes.cfg'), colorPalettesDotCfg);
}

const rgb = converter('rgb');

const config: Config = {
  colorPalettes: [
    {
      name: 'oklch',
      steps: 360,
      fn: (h) => {
        return rgb({ mode: 'oklch', l: 0.75, c: 0.1275, h });
      },
    },
    {
      name: 'hsl',
      steps: 360,
      fn: (h) => {
        return rgb({ mode: 'hsl', h, s: 1, l: 0.5 });
      },
    },
    // You can make your own color palette.
    // {
    //   name: 'random',
    //   steps: 120,
    //   fn: () => ({ r: Math.random(), g: Math.random(), b: Math.random() }),
    // },
  ],
  internalAliases: {
    color: '__c', // Don't modify this because I hardcoded it.
    nextColor: '__nc', // Don't modify this because I hardcoded it.
  },
  aliasPrefix: 'rainbow_crosshair', // Don't modify this because I hardcoded it.
  outDir: './t1ckbase_rainbow_crosshair', // Do not modify this or it will break.
  aliasesPerFile: 120, // Do not modify this unless you know what you are doing.
};

buildCFG(config);
