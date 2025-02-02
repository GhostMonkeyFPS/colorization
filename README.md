# Nuxt Colorization

This hobby project focuses on building an image colorization model that can take grayscale images as input
and generate a colorized version as output.
The model uses deep learning techniques to predict the missing color information based on patterns and
features learned from a large dataset.
Whether you're working with old black-and-white photos or simply want to see a grayscale image come to life
in color,
this tool provides a simple way to add vibrance and restore color to your images.


This image colorization model is trained for 30 epochs on the CIFAR-10 dataset, 
which consists of 60,000 small images across 10 different categories. 
By learning color patterns from this dataset, the model can generalize and predict realistic colors for grayscale images. 
The training process helps the model refine its ability to restore natural-looking colors based on features it identifies, 
making it useful for enhancing black-and-white images with vibrant and context-aware colorization.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
