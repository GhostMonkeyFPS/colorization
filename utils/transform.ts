import {lab2rgb} from "~/utils/lab";

export const imageToFloat32ArrayGrayscale = (imageData: ImageData): Float32Array => {
    const data = imageData.data;

    const float32Array = new Float32Array(imageData.width * imageData.height);

    for (let i = 0; i < data.length; i += 4) {
        // Calculate the grayscale value (e.g., using luminosity method)
        const grayscale = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        float32Array[i / 4] = grayscale / 127.5 - 1; // Normalize to [-1, 1]
    }

    return float32Array;
};

export const combineChannelsToImage = (gray_scaled: Float32Array, ab_channels: Float32Array, width: number, height: number): ImageData => {
    const normalized_l = gray_scaled.map((l: number) => Math.min(100, Math.max(0, (l + 1) * 50)));
    const denormalized_ab = ab_channels.map((ab: number) => Math.min(127, Math.max(-128, ab * 128)));

    const imageData = new ImageData(width, height);
    for (let i = 0; i < width * height; i++) {

        const l_l = normalized_l[i]; // L channel
        const l_a = denormalized_ab[i]; // A channel
        const l_b = denormalized_ab[i + width * height]; // B channel

        const [r, g, b] = lab2rgb([l_l, l_a, l_b]);

        imageData.data[i * 4] = Math.min(255, Math.max(0, r * 255)); // Red
        imageData.data[i * 4 + 1] = Math.min(255, Math.max(0, g * 255)); // Green
        imageData.data[i * 4 + 2] = Math.min(255, Math.max(0, b * 255)); // Blue
        imageData.data[i * 4 + 3] = 255; // Alpha (fully opaque)
    }

    return imageData;
}


