import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserProfile } from "@/services/appwriteProfile";
import { COIN_PACKAGES, purchaseCoinPackage } from "@/services/appwriteStore";
import SpinWheel from "@/components/SpinWheel";

const glows = ["cyan", "magenta", "lime"] as const;

export default function Store() {
  const { user } = useAuth();
  const [coins, setCoins] = useState<number | null>(null);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [buyError, setBuyError] = useState("");
  const [buySuccess, setBuySuccess] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchUserProfile(user.$id)
      .then((profile) => setCoins(profile.coins))
      .catch(console.error);
  }, [user]);

  const handleBuy = async (packageId: string) => {
    if (!user) {
      setBuyError("Please log in to purchase coins.");
      return;
    }
    setBuyingId(packageId);
    setBuyError("");
    setBuySuccess("");
    try {
      const newCoins = await purchaseCoinPackage(user.$id, packageId);
      setCoins(newCoins);
      setBuySuccess(`Purchase successful! Your new balance: ${newCoins} coins`);
    } catch (err: unknown) {
      if (err instanceof Error) setBuyError(err.message);
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <div className="container py-16">
      <SectionTitle
        eyebrow="// Store"
        title="Coin Store"
        subtitle="Purchase coin packages or spin the wheel for bonus coins."
      />

      {/* Balance display */}
      <div className="mt-8 flex justify-center">
        {user ? (
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white">
            <Coins className="h-5 w-5 text-amber-400" />
            <span className="text-sm text-white/70">Your Balance:</span>
            <span className="text-xl font-bold text-amber-400">
              {coins !== null ? `${coins} 🪙` : "Loading..."}
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Log in to purchase coins or spin the wheel.
          </p>
        )}
      </div>

      {/* Coin packages */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {COIN_PACKAGES.map((pkg, i) => (
          <ScrollReveal key={pkg.id} delay={i * 0.08}>
            <GlowCard glow={glows[i]} className="h-full flex flex-col gap-4">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-display text-xl font-bold">{pkg.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {pkg.coins.toLocaleString()} 🪙 Coins
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-mono text-sm text-accent">
                  ${pkg.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleBuy(pkg.id)}
                  disabled={buyingId === pkg.id}
                  className="rounded-full bg-primary/20 px-5 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buyingId === pkg.id ? "Buying..." : "Buy"}
                </button>
              </div>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Buy status messages */}
      {buySuccess && (
        <p className="mt-6 text-center text-sm font-medium text-green-400">
          {buySuccess}
        </p>
      )}
      {buyError && (
        <p className="mt-6 text-center text-sm font-medium text-red-400">
          {buyError}
        </p>
      )}

      {/* Spin Wheel section */}
      <div className="mt-16">
        <SectionTitle
          eyebrow="// Bonus"
          title="Spin to Win"
          subtitle="Spin the wheel for a chance to earn bonus coins!"
        />
        <div className="mt-8 flex justify-center">
          <SpinWheel
            onCoinsUpdate={(newCoins) => {
              setCoins(newCoins);
              setBuySuccess(`Wheel result applied! New balance: ${newCoins} coins`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
