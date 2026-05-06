import { databases, Query } from "./appwriteClient";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

if (!DATABASE_ID || !USERS_COLLECTION_ID) {
  throw new Error(
    "[Appwrite] Missing VITE_APPWRITE_DATABASE_ID or VITE_APPWRITE_USERS_COLLECTION_ID in your .env file."
  );
}

export interface LeaderboardPlayer {
  userId: string;
  username: string;
  email: string;
  avatarColor: string;
  avatarUrl: string;
  coins: number;
  wins: number;
  losses: number;
  bio: string;
}

export async function fetchLeaderboard(): Promise<LeaderboardPlayer[]> {
  const response = await databases.listDocuments(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    [Query.orderDesc("coins")]
  );

  return response.documents.map((doc) => ({
    userId: doc.userId,
    username: doc.username,
    email: doc.email,
    avatarColor: doc.avatarColor,
    avatarUrl: doc.avatarUrl || "",
    coins: doc.coins,
    wins: doc.wins,
    losses: doc.losses,
    bio: doc.bio || "",
  }));
}
