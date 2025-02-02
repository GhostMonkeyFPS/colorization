export const lab2rgb = ([l, a, b]: Array<number>): Array<number> => {

    // Convert LAB to XYZ
    const y = (l + 16) / 116;
    const x = y + a / 500;
    const z = y - b / 200;

    const X = 0.95047 * (x > 0.206893 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787);
    const Y = 1.00000 * (y > 0.206893 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787);
    const Z = 1.08883 * (z > 0.206893 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787);

    // Convert XYZ to RGB
    const R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    const G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    const B = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

    // Apply gamma correction and clamp to [0, 1]
    return [R, G, B].map((v) =>
        v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v
    );
}
