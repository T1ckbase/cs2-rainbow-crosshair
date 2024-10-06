import net from 'node:net';
import { oklch2rgb } from './helpers/oklch2rgb.js';

// Launch Option
// -netconport 22333 -tools

const sleep = ms => new Promise(r => setTimeout(r, ms));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


async function cringe(socket) {
    while(socket) {
        socket.write(`cl_crosshaircolor_r ${randomInt(0, 255)}; cl_crosshaircolor_g ${randomInt(0, 255)}; cl_crosshaircolor_b ${randomInt(0, 255)};\n`);
        await sleep(100);
    }
}



const socket = net.Socket();

socket.connect(22333, '127.0.0.1', function() {
	console.log('Connected');
	socket.write('echo "Hello World"\n');
    cringe(socket);
});

socket.on('data', function(data) {
    const text = data.toString('utf-8');
	console.log(text);
});

socket.on('close', function() {
    console.log('Connection closed');
});


// socket.destroy();