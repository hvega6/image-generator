// gallery.js
import { fetchImages, generateImage } from './api.js';

export const displayImages = (images) => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Clear previous images
  images.forEach(image => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.alt = image.prompt;
    gallery.appendChild(imgElement);
  });
};

export const searchImages = async (query) => {
  const images = await fetchImages(query);
  displayImages(images);
};

// New function to handle image generation
export const createImage = async (prompt) => {
  const result = await generateImage(prompt);
  if (result && result.images) {
    displayImages(result.images); // Assuming result.images contains the generated images
  }
};