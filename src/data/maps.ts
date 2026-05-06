export interface RaceMap {
  id: string;
  name: string;
  difficulty: "Rookie" | "Pro" | "Insane";
  length: string;
  laps: number;
  biome: string;
  price: number;
}

export const maps: RaceMap[] = [
  { id: "neon-shibuya", name: "Neon Shibuya", difficulty: "Rookie", length: "3.4 km", laps: 4, biome: "Urban", price: 0 },
  { id: "skylink-hyperloop", name: "Skylink Hyperloop", difficulty: "Pro", length: "5.8 km", laps: 3, biome: "Highway", price: 4200 },
  { id: "midnight-port", name: "Midnight Port", difficulty: "Pro", length: "4.1 km", laps: 4, biome: "Industrial", price: 3500 },
  { id: "void-canyon", name: "Void Canyon", difficulty: "Insane", length: "7.2 km", laps: 2, biome: "Mountain", price: 8400 },
  { id: "chrome-bay", name: "Chrome Bay", difficulty: "Pro", length: "4.6 km", laps: 4, biome: "Coastal", price: 5200 },
  { id: "spectre-circuit", name: "Spectre Circuit", difficulty: "Insane", length: "6.4 km", laps: 3, biome: "Desert", price: 9800 },
];