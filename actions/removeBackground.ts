'use server'

import * as fal from "@fal-ai/serverless-client";

interface Media {
  image: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
    width: number;
    height: number;
  };
  mask_image: string | null;
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function removeBackground(imageData: string) {
  try {
    const response: Media = await fal.subscribe("fal-ai/birefnet", {
      input: {
        image_url: imageData, // Assuming imageData is a URL string
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update?.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    return response.image.url;
  } catch (error) {
    console.error('Background removal failed:', error);
    throw error;
  }
}