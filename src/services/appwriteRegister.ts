import { ID } from "appwrite";
import { account, databases } from "./appwriteClient";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

if (!DATABASE_ID || !USERS_COLLECTION_ID) {
  throw new Error(
    "[Appwrite] Missing VITE_APPWRITE_DATABASE_ID or VITE_APPWRITE_USERS_COLLECTION_ID in your .env file."
  );
}

export interface RegisterPayload {
  displayName: string;
  email: string;
  password: string;
  bio?: string;
  profilePicUrl?: string;
}

export interface UserDocument {
  userId: string;
  username: string;
  email: string;
  avatarColor: string;
  coins: number;
  wins: number;
  losses: number;
  avatarUrl: string;
  bio: string;
}

const RACING_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6",
];

function getRandomRacingColor(): string {
  return RACING_COLORS[Math.floor(Math.random() * RACING_COLORS.length)];
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
  const { displayName, email, password, bio, profilePicUrl } = payload;

  // Step 1: Create Appwrite Auth account
  const authAccount = await account.create(
    ID.unique(),
    email,
    password,
    displayName
  );

  // Step 2: Create user document in database
  const userDoc: UserDocument = {
    userId: authAccount.$id,
    username: displayName,
    email: email,
    avatarColor: getRandomRacingColor(),
    coins: 500,
    wins: 0,
    losses: 0,
    avatarUrl: profilePicUrl?.trim() || "",
    bio: bio?.trim() || "New racer joining the Hyper grid.",
  };

  await databases.createDocument(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    ID.unique(),
    userDoc
  );
}
