import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import SpinWheelGame from "@/components/SpinWheel";
import { useAuth } from "@/context/AuthContext";
import { fetchUserProfile } from "@/services/appwriteProfile";
import { SPIN_COST_COINS } from "@/services/appwriteStore";

export default function SpinWheel() {
  const { user } = useAuth();
  const [coins, setCoins] = useState<number | null>(null);
  const [balanceError, setBalanceError] = useState("");

  useEffect(() => {
    if (!user) {
      setCoins(null);
      return;
    }

    setBalanceError("");
    fetchUserProfile(user.$id)
      .then((profile) => setCoins(profile.coins))
      .catch((err: unknown) => {
        if (err instanceof Error) setBalanceError(err.message);
      });
  }, [user]);

  return (
    <div className="container py-16 max-w-3xl">
      <SectionTitle
        eyebrow="// Daily Spin"
        title="Spin to Win"
        subtitle={`Every spin costs ${SPIN_COST_COINS} coins. Win bonus coins, cards, and boosters.`}
      />

      <div className="mt-8 flex justify-center">
        {user ? (
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white">
            <span className="text-sm text-white/70">Your Balance:</span>
            <span className="text-xl font-bold text-amber-400">
              {coins !== null ? `${coins} coins` : "Loading..."}
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Log in to spin the wheel.</p>
        )}
      </div>

      {balanceError && (
        <p className="mt-6 text-center text-sm font-medium text-red-400">
          {balanceError}
        </p>
      )}

      <GlowCard className="mt-10 grid place-items-center py-12">
        <SpinWheelGame coins={coins} onCoinsUpdate={setCoins} />
      </GlowCard>
    </div>
  );
}
