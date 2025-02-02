<script setup lang="ts">
import * as ort from "onnxruntime-web";

ort.env.wasm.wasmPaths = {
  wasm: 'ort-wasm-simd-threaded.wasm',
};

useHead({
  meta: [
    {name: 'google-site-verification', content: 'LB04BPg6ogl1ZtrCxBfDQUEmhYBCV1-ovWSpoY6P-pc'}
  ],
})

const processing = ref<boolean>(false);
const upload = ref<boolean>(false);

const originalCanvas = useTemplateRef<HTMLCanvasElement>('originalCanvas');
const colorizedCanvas = useTemplateRef<HTMLCanvasElement>('colorizedCanvas');

function onImageUpload(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      upload.value = true;

      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const ctx = originalCanvas.value.getContext('2d');
        ctx.canvas.width = img.width
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }
    };
    reader.readAsDataURL(file);
  }
}


async function processImage() {
  if (upload === null || !processing) {
    return;
  }

  processing.value = true;

  await model(originalCanvas.value, colorizedCanvas.value);

  processing.value = false;
}

</script>

<template>
  <main>
    <div class="container">
      <div
          class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header page-header pb-8">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Grayscale image colorization
        </h1>

        <div class="max-w-[750px] text-center text-lg font-light text-foreground">
          <p class="text-lg font-normal lg:text-lg mb-5">
            This hobby project focuses on building an image colorization model that can take grayscale images as input
            and generate a colorized version as output.
            The model uses deep learning techniques to predict the missing color information based on patterns and
            features learned from a large dataset.
            Whether you're working with old black-and-white photos or simply want to see a grayscale image come to life
            in color,
            this tool provides a simple way to add vibrance and restore color to your images.
          </p>
        </div>

        <div class="mt-8 text-center">
          <div class="grid w-full max-w-sm items-center gap-3">
            <Label for="picture">Picture</Label>
            <Input @change="onImageUpload" accept="image/*" id="picture" type="file"
                   class="bg-white dark:border-gray-900"/>
            <Button @click="processImage">Upload and Colorize</Button>

          </div>
        </div>

        <div class="mt-8 text-center">
          <h2 class="text-2xl font-semibold">Result:</h2>
          <div class="mt-4">
            <canvas ref="originalCanvas" class="mx-auto max-w-full h-auto mt-6" />

            <Skeleton v-if="processing" class="w-full h-[500px] mt-6" />

            <canvas ref="colorizedCanvas" class="mx-auto max-w-full h-auto mt-6" :class="{ 'hidden': processing  }" />
          </div>
        </div>

      </div>
    </div>
  </main>
</template>
