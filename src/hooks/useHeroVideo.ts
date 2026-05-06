import { useState, useEffect } from "react";
import {
  getHeroVideoUrl,
  fetchHeroVideo,
  HeroVideo,
} from "../services/appwriteVideo";

export function useHeroVideo() {
  const [video, setVideo] = useState<HeroVideo>({
    fileId: "heroVideo",
    url: getHeroVideoUrl(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHeroVideo()
      .then((v) => {
        setVideo(v);
        setError("");
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { video, loading, error };
}
