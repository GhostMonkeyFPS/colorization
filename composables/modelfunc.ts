import ort from "onnxruntime-web";
import {combineChannelsToImage, imageToFloat32ArrayGrayscale} from "~/utils/transform";

interface ModelFunc {
    (source: HTMLCanvasElement, destination: HTMLCanvasElement): Promise<void>;
}

export const model: ModelFunc = async (source: HTMLCanvasElement, destination: HTMLCanvasElement): Promise<void> => {
    const ctx =  source.getContext('2d')

    const session = await ort.InferenceSession.create("colorization_model.onnx");

    const grayimage = imageToFloat32ArrayGrayscale(ctx.getImageData(0, 0, source.width, source.height));
    const input = new ort.Tensor('float32', grayimage, [1, 1, source.height, source.width]);

    const feeds = {input};
    const results = await session.run(feeds);

    const predicted_l_channel_n = results.output.data; // Output is a Float32Array


    const img_data = combineChannelsToImage(grayimage, predicted_l_channel_n, source.width, source.height);

    const ctx_destination = destination.getContext('2d');

    ctx_destination.canvas.width = source.width;
    ctx_destination.canvas.height = source.height;
    ctx_destination.putImageData(img_data, 0, 0);
};
