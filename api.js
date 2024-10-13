// api.js
import * as fal from "@fal-ai/serverless-client";

const API_URL = "https://your-api-url.com"; // Keep this for other API calls if needed

// Configure the fal client with credentials
fal.config({
  credentials: "YOUR_FAL_KEY"
});

// Function to generate an image based on a prompt
export const generateImage = async (prompt) => {
  try {
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: { prompt },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    return result; // Return the result for further processing
  } catch (error) {
    console.error("Image generation error:", error);
  }
};

// Function to fetch images (if needed for other purposes)
export const fetchImages = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Function to upload an image
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
  }
};

fal.config({
    proxyUrl: "/api/fal/proxy",
  });