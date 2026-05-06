import { useRef, useState, useEffect, type ChangeEvent, type ReactNode } from "react";
import { useHeroVideo } from "../hooks/useHeroVideo";

interface HeroVideoProps {
  children?: ReactNode;
  className?: string;
  src?: string;
}

export default function HeroVideo({ children, className = "", src }: HeroVideoProps) {
  const { video, error } = useHeroVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const videoUrl = src || video.url;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
      videoRef.current.defaultMuted = true;
    }
  }, [muted, volume]);

  useEffect(() => {
    setVideoFailed(false);
    setIsPlaying(false);
  }, [videoUrl]);

  const toggleMute = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const nextMuted = !muted;
    const nextVolume = volume === 0 && !nextMuted ? 0.5 : volume;

    videoElement.volume = nextVolume;
    videoElement.muted = nextMuted;
    setVolume(nextVolume);
    setMuted(nextMuted);

    if (!nextMuted) {
      try {
        await videoElement.play();
      } catch (err) {
        console.error("[HeroVideo] Could not start audio playback:", err);
        videoElement.muted = true;
        setMuted(true);
      }
    }
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseFloat(event.target.value);
    setVolume(nextVolume);
    if (videoRef.current) {
      videoRef.current.volume = nextVolume;
      if (nextVolume === 0) {
        videoRef.current.muted = true;
        setMuted(true);
      } else {
        videoRef.current.muted = false;
        setMuted(false);
        videoRef.current.play().catch((err) => {
          console.error("[HeroVideo] Could not start audio playback:", err);
          if (videoRef.current) videoRef.current.muted = true;
          setMuted(true);
        });
      }
    }
  };

  const handleVideoError = () => {
    console.error("[HeroVideo] Failed to load video:", videoUrl);
    setVideoFailed(true);
  };

  const hasVideo = !videoFailed && (!!src || !error);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ minHeight: "100vh" }}>
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={muted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onError={handleVideoError}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isPlaying ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
          }}
        />
      )}

      {!hasVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, #0f172a, #020617)",
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {hasVideo && (
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "24px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            borderRadius: "999px",
            padding: "8px 16px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute hero video" : "Mute hero video"}
            title={muted ? "Unmute" : "Mute"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {muted ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27 7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21 21 19.73 12 10.73 4.27 3ZM12 4L9.91 6.09 12 8.18V4Z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" />
              </svg>
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            style={{
              width: "80px",
              accentColor: "#ef4444",
              cursor: "pointer",
            }}
          />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
