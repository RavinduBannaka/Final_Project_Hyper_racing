import { storage } from "./appwriteClient";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

if (!BUCKET_ID) {
  throw new Error(
    "[Appwrite] Missing VITE_APPWRITE_STORAGE_ID in your .env file."
  );
}

export interface HeroVideo {
  fileId: string;
  url: string;
}

const HERO_VIDEO_FILE_ID = "heroVideo";

export function getHeroVideoUrl(): string {
  return storage.getFileView(BUCKET_ID, HERO_VIDEO_FILE_ID).toString();
}

export async function fetchHeroVideo(): Promise<HeroVideo> {
  try {
    await storage.getFile(BUCKET_ID, HERO_VIDEO_FILE_ID);
    return {
      fileId: HERO_VIDEO_FILE_ID,
      url: getHeroVideoUrl(),
    };
  } catch (err) {
    console.error(
      `[Video] Could not access heroVideo in bucket "${BUCKET_ID}":`,
      err
    );
    throw new Error(
      "Hero video not found. Please upload the video to Appwrite storage with File ID: heroVideo"
    );
  }
}
