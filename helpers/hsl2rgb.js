// https://stackoverflow.com/a/64090995
// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
export function hsl2rgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}