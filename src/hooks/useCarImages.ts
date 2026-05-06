import { useState, useEffect } from "react";
import { getCarData, fetchCarImages, CarData } from "@/services/appwriteCars";

export function useCarImages() {
  const [cars, setCars] = useState<CarData[]>(getCarData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCarImages()
      .then((verified) => {
        if (verified.length === 0) {
          setError(
            "No car images found. Check Appwrite bucket permissions and file IDs."
          );
        } else {
          setCars(verified);
          setError("");
        }
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const getCarByName = (name: string): CarData | undefined =>
    cars.find((c) => c.name.toLowerCase() === name.toLowerCase());

  return { cars, loading, error, getCarByName };
}
