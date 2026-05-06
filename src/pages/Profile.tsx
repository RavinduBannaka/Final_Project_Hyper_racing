import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchUserProfile, UserProfile } from "@/services/appwriteProfile";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (!user) return;

    fetchUserProfile(user.$id)
      .then(setProfile)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="container py-16 max-w-2xl">
        <SectionTitle eyebrow="// Profile" title="Loading..." />
        <GlowCard className="mt-10 p-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </GlowCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-16 max-w-2xl">
        <SectionTitle eyebrow="// Profile" title="Error" />
        <GlowCard className="mt-10 p-8">
          <p className="text-red-400 text-center">{error}</p>
        </GlowCard>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-16 max-w-2xl">
        <SectionTitle eyebrow="// Profile" title="Not found" />
        <GlowCard className="mt-10 p-8">
          <p className="text-muted-foreground text-center">Profile not found.</p>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="container py-16 max-w-2xl">
      <SectionTitle eyebrow="// Profile" title={profile.username} />
      <GlowCard className="mt-10 p-8">
        <div className="space-y-6">
          {/* Avatar and name section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="h-24 w-24 rounded-full flex-shrink-0 grid place-items-center text-3xl font-display font-black text-primary-foreground overflow-hidden mb-4"
              style={{
                backgroundColor: profile.avatarUrl ? "transparent" : profile.avatarColor,
              }}
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                profile.username.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="text-3xl font-display font-black text-foreground">
              {profile.username}
            </h2>
            <p className="text-muted-foreground mt-1">{profile.email}</p>
          </div>

          {/* Bio section */}
          {profile.bio && (
            <div className="border-t border-border/60 pt-6">
              <p className="text-foreground italic">{profile.bio}</p>
            </div>
          )}

          {/* Stats grid */}
          <div className="border-t border-border/60 pt-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Coins */}
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">🪙</div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Coins
                </p>
                <p className="text-2xl font-mono font-semibold text-primary">
                  {profile.coins.toLocaleString()}
                </p>
              </div>

              {/* Wins */}
              <div className="bg-green-500/10 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">✅</div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Wins
                </p>
                <p className="text-2xl font-mono font-semibold text-green-400">
                  {profile.wins}
                </p>
              </div>

              {/* Losses */}
              <div className="bg-red-500/10 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">❌</div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Losses
                </p>
                <p className="text-2xl font-mono font-semibold text-red-400">
                  {profile.losses}
                </p>
              </div>
            </div>
          </div>

          {/* Win/Loss ratio */}
          {profile.wins + profile.losses > 0 && (
            <div className="border-t border-border/60 pt-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                  Win Rate
                </p>
                <p className="text-2xl font-mono font-semibold text-primary">
                  {((profile.wins / (profile.wins + profile.losses)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </GlowCard>
    </div>
  );
}
