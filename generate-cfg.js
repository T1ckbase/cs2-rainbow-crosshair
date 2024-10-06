import fs from 'node:fs';
import { hsl2rgb } from './helpers/hsl2rgb.js';
import { oklch2rgb } from './helpers/oklch2rgb.js';

const CCC = 'cl_crosshaircolor';

// const next_step = '__ns';
const next_color = '__nc';
const color_number = '__c';

const size = 360;
const output_dir = 't1ckbase_rainbow_crosshair/';
const output_name = 'rainbow_crosshair';

function generateCommands() {
    let data = [];
    for (let i = 0; i < size; i++) {
        let color = oklch2rgb([0.75, 0.1275, i*(360/size)]); // hsl2rgb(i*(360/size), 1, 0.5);
        color = color.map(c => Math.round(c * 255));
        data.push(`alias ${color_number}${i} "${CCC}_r ${color[0]};${CCC}_g ${color[1]};${CCC}_b ${color[2]};alias ${next_color} ${color_number}${i+1 == size ? 0 : i+1}"`);
    }
    return data;
}

const linesPerFile = 120;
let fileIndex = 1;

const allCommands = generateCommands();

for (let i = 0; i < allCommands.length; i += linesPerFile) {
    const commands = allCommands.slice(i, i + linesPerFile).join('\n');
    try {
        fs.writeFileSync(output_dir + `${output_name}_${fileIndex}.cfg`, commands);
        console.log(`wrote ${output_name}_${fileIndex}.cfg`);
        fileIndex++;
    } catch (err) {
        console.error('Error', err);
    }
}