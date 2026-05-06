import { databases, Query } from "./appwriteClient";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

export interface CoinPackage {
  id: string;
  label: string;
  price: number;
  coins: number;
}

export const COIN_PACKAGES: CoinPackage[] = [
  { id: "pack_1", label: "Starter Pack", price: 1, coins: 500 },
  { id: "pack_5", label: "Racer Pack", price: 5, coins: 1000 },
  { id: "pack_10", label: "Champion Pack", price: 10, coins: 2000 },
];

export type SpinResult = {
  label: string;
  coins: number;
  color: string;
};

export const SPIN_SEGMENTS: SpinResult[] = [
  { label: "Bad Luck", coins: 0, color: "#6b7280" },
  { label: "+50 Coins", coins: 50, color: "#f59e0b" },
  { label: "+100 Coins", coins: 100, color: "#22c55e" },
  { label: "-10 Coins", coins: -10, color: "#ef4444" },
];

async function getUserDocumentId(userId: string): Promise<string> {
  const response = await databases.listDocuments(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  if (response.documents.length === 0) throw new Error("User profile not found.");
  return response.documents[0].$id;
}

async function getCurrentCoins(userId: string): Promise<number> {
  const response = await databases.listDocuments(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  if (response.documents.length === 0) throw new Error("User profile not found.");
  return response.documents[0].coins as number;
}

export async function purchaseCoinPackage(
  userId: string,
  packageId: string
): Promise<number> {
  const pkg = COIN_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) throw new Error("Invalid package.");

  const [docId, currentCoins] = await Promise.all([
    getUserDocumentId(userId),
    getCurrentCoins(userId),
  ]);

  const newCoins = currentCoins + pkg.coins;

  await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, docId, {
    coins: newCoins,
  });

  return newCoins;
}

export async function applySpinResult(
  userId: string,
  segmentIndex: number
): Promise<{ newCoins: number; result: SpinResult }> {
  const result = SPIN_SEGMENTS[segmentIndex];
  if (!result) throw new Error("Invalid spin segment.");

  const [docId, currentCoins] = await Promise.all([
    getUserDocumentId(userId),
    getCurrentCoins(userId),
  ]);

  const newCoins = Math.max(0, currentCoins + result.coins);

  await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, docId, {
    coins: newCoins,
  });

  return { newCoins, result };
}
