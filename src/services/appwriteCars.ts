import { storage } from "./appwriteClient";
import { CarCategory } from "@/data/cars";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

if (!BUCKET_ID) {
  throw new Error(
    "[Appwrite] Missing VITE_APPWRITE_STORAGE_ID in your .env file."
  );
}

type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

const CAR_ENTRIES: {
  fileId: string;
  name: string;
  displayName: string;
  category: CarCategory;
  rarity: Rarity;
  price: number;
}[] = [
  { fileId: "blackCar",  name: "blackCar",  displayName: "Shadow Formula F1",  category: "Formula",  rarity: "Legendary", price: 32000 },
  { fileId: "greenCar",  name: "greenCar",  displayName: "Lime Venom GT",      category: "Street",   rarity: "Rare",      price: 9200  },
  { fileId: "purpleCar", name: "purpleCar", displayName: "Violet Phantom RX",   category: "Hyper",    rarity: "Epic",      price: 19800 },
  { fileId: "redCar",    name: "redCar",    displayName: "Ember Drift Beast",   category: "Drift",    rarity: "Epic",      price: 14200 },
];

function deterministicStats(fileId: string): { speed: number; accel: number; handling: number; nitro: number } {
  let hash = 0;
  for (let i = 0; i < fileId.length; i++) {
    hash = ((hash << 5) - hash + fileId.charCodeAt(i)) | 0;
  }
  const base = Math.abs(hash);
  return {
    speed: 75 + (base % 26),
    accel: 70 + ((base >> 8) % 31),
    handling: 65 + ((base >> 16) % 36),
    nitro: 60 + ((base >> 24) % 41),
  };
}

export interface CarData {
  fileId: string;
  name: string;
  displayName: string;
  category: CarCategory;
  rarity: Rarity;
  price: number;
  url: string;
  stats: { speed: number; accel: number; handling: number; nitro: number };
}

export interface CarImage {
  fileId: string;
  name: string;
  url: string;
}

function buildCarData(entry: typeof CAR_ENTRIES[number]): CarData {
  return {
    fileId: entry.fileId,
    name: entry.name,
    displayName: entry.displayName,
    category: entry.category,
    rarity: entry.rarity,
    price: entry.price,
    url: storage.getFileView(BUCKET_ID, entry.fileId).toString(),
    stats: deterministicStats(entry.fileId),
  };
}

function buildCarImage(entry: typeof CAR_ENTRIES[number]): CarImage {
  return {
    fileId: entry.fileId,
    name: entry.name,
    url: storage.getFileView(BUCKET_ID, entry.fileId).toString(),
  };
}

export function getCarImageUrl(fileId: string): string {
  return storage.getFileView(BUCKET_ID, fileId).toString();
}

export function getCarImages(): CarImage[] {
  return CAR_ENTRIES.map(buildCarImage);
}

export function getCarData(): CarData[] {
  return CAR_ENTRIES.map(buildCarData);
}

export async function fetchCarImages(): Promise<CarData[]> {
  const results: CarData[] = [];

  for (const entry of CAR_ENTRIES) {
    try {
      await storage.getFile(BUCKET_ID, entry.fileId);
      results.push(buildCarData(entry));
    } catch (err) {
      console.error(
        `[Cars] Could not access file "${entry.fileId}" in bucket "${BUCKET_ID}":`,
        err
      );
    }
  }

  return results;
}
