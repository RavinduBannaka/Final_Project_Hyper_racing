import { storage } from "./appwriteClient";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

if (!BUCKET_ID) {
  throw new Error(
    "[Appwrite] Missing VITE_APPWRITE_STORAGE_ID in your .env file."
  );
}

export interface MapImage {
  fileId: string;
  name: string;
  url: string;
}

// File IDs match the custom IDs set when uploaded to Appwrite storage
const MAP_FILE_IDS: { fileId: string; name: string }[] = [
  { fileId: "city", name: "City" },
  { fileId: "jungle", name: "Jungle" },
];

export function getMapImageUrl(fileId: string): string {
  return storage.getFileView(BUCKET_ID, fileId).toString();
}

export function getMapImages(): MapImage[] {
  return MAP_FILE_IDS.map(({ fileId, name }) => ({
    fileId,
    name,
    url: getMapImageUrl(fileId),
  }));
}

export async function fetchMapImages(): Promise<MapImage[]> {
  const results: MapImage[] = [];

  for (const { fileId, name } of MAP_FILE_IDS) {
    try {
      await storage.getFile(BUCKET_ID, fileId);
      results.push({
        fileId,
        name,
        url: getMapImageUrl(fileId),
      });
    } catch (err) {
      console.error(
        `[Maps] Could not access file "${fileId}" in bucket "${BUCKET_ID}":`,
        err
      );
    }
  }

  return results;
}
