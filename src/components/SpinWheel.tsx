import { useState, useRef, useEffect } from "react";
import {
  SPIN_COST_COINS,
  SPIN_SEGMENTS,
  SpinResult,
  applySpinResult,
} from "@/services/appwriteStore";
import { useAuth } from "@/context/AuthContext";

interface SpinWheelProps {
  coins: number | null;
  onCoinsUpdate: (newCoins: number) => void;
}

export default function SpinWheel({ coins, onCoinsUpdate }: SpinWheelProps) {
  const { user } = useAuth();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [error, setError] = useState("");
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => setResult(null), 3000);
    return () => clearTimeout(timer);
  }, [result]);

  const handleSpin = async () => {
    if (!user || spinning || result) return;
    setError("");
    setResult(null);

    if (coins === null) {
      setError("Loading your coin balance. Please try again in a moment.");
      return;
    }

    if (coins < SPIN_COST_COINS) {
      setError(`You need at least ${SPIN_COST_COINS} coins to spin the wheel.`);
      return;
    }

    const segmentIndex = Math.floor(Math.random() * 4);
    const fullSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const segmentAngle = segmentIndex * 90 + 45;
    const targetMod = 360 - segmentAngle;
    const currentMod = rotation % 360;
    const neededExtra = ((targetMod - currentMod) % 360 + 360) % 360;
    const finalRotation = rotation + fullSpins + neededExtra;

    setSpinning(true);
    setRotation(finalRotation);

    setTimeout(async () => {
      try {
        const { newCoins, result: spinResult } = await applySpinResult(
          user.$id,
          segmentIndex
        );
        setResult(spinResult);
        onCoinsUpdate(newCoins);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setSpinning(false);
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Wheel container */}
        <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(255,46,64,0.3)]" />

          {/* Rotating wheel */}
          <div
            ref={wheelRef}
            className="absolute inset-2 overflow-hidden rounded-full transition-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              background: `conic-gradient(
                ${SPIN_SEGMENTS[0].color} 0deg 90deg,
                ${SPIN_SEGMENTS[1].color} 90deg 180deg,
                ${SPIN_SEGMENTS[2].color} 180deg 270deg,
                ${SPIN_SEGMENTS[3].color} 270deg 360deg
              )`,
            }}
          >
            {/* Segment divider lines */}
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                className="absolute inset-0"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 bg-white/30" />
              </div>
            ))}

            {/* Segment labels */}
            {SPIN_SEGMENTS.map((seg, i) => {
              const angle = i * 90 + 45;
              return (
                <div
                  key={seg.label}
                  className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-65%) rotate(-${angle}deg)`,
                  }}
                >
                  {seg.label}
                </div>
              );
            })}

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900/90 border-2 border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spin button */}
      {!user ? (
        <p className="text-sm text-muted-foreground">Log in to spin the wheel.</p>
      ) : (
        <>
          <p className="text-sm text-white/70">
            Each spin costs {SPIN_COST_COINS} coins.
          </p>
          <button
            onClick={handleSpin}
            disabled={spinning || !!result || coins === null || coins < SPIN_COST_COINS}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(255,46,64,0.4)] transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
          {spinning ? "Spinning..." : result ? "Result Shown" : "🎰 Spin"}
          </button>
        </>
      )}

      {/* Result banner */}
      {result && (
        <div
          className="rounded-xl border border-white/15 px-6 py-4 text-center backdrop-blur-sm"
          style={{
            background: `${result.color}22`,
            borderColor: `${result.color}50`,
          }}
        >
          <p className="text-lg font-bold text-white">{result.label}</p>
          <p className="mt-1 text-sm text-white/80">
            {result.coins > 0 ? `+${result.coins} coins` : result.coins < 0 ? `${result.coins} coins` : "No change"}
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
