import { useState, useEffect } from "react";
import { getMapImages, fetchMapImages, MapImage } from "../services/appwriteMaps";

export function useMapImages() {
  const [maps, setMaps] = useState<MapImage[]>(getMapImages());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchMapImages()
      .then((verified) => {
        if (verified.length === 0) {
          setError(
            "No map images found. Check Appwrite bucket permissions and file IDs."
          );
        } else {
          setMaps(verified);
          setError("");
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getMapByName = (name: string): MapImage | undefined =>
    maps.find((m) => m.name.toLowerCase() === name.toLowerCase());

  const getMapById = (fileId: string): MapImage | undefined =>
    maps.find((m) => m.fileId === fileId);

  return { maps, loading, error, getMapByName, getMapById };
}
