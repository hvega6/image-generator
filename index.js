// index.js
import { searchImages, createImage } from './gallery.js';

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  searchImages(query);
});

// New event listener for generating an image
document.getElementById("generateButton").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  await createImage(prompt);
});

// Example of uploading an image
document.getElementById("uploadButton").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const result = await uploadImage(file);
    console.log("Upload result:", result);
  }
});