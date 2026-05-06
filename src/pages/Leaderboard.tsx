import { useEffect, useState } from "react";
import { fetchLeaderboard, LeaderboardPlayer } from "@/services/appwriteLeaderboard";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard()
      .then(setPlayers)
      .catch((err: Error) => setError(err.message || "Failed to load leaderboard."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-16 max-w-6xl">
      <SectionTitle
        eyebrow="// Rankings"
        title="Global leaderboard"
        subtitle="Top racers by coins earned."
      />

      <GlowCard className="mt-10 p-6">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && players.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No players found.</p>
          </div>
        )}

        {!loading && !error && players.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Player</th>
                  <th className="text-right py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Coins</th>
                  <th className="text-right py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Wins</th>
                  <th className="text-right py-3 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Losses</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, idx) => {
                  const rank = idx + 1;
                  const isTopThree = rank <= 3;
                  const topThreeColor = rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32";
                  return (
                    <tr
                      key={player.userId}
                      className={cn(
                        "border-b border-border/40 transition-colors hover:bg-primary/5",
                        isTopThree && "bg-primary/10"
                      )}
                    >
                      <td className="py-4 px-4 font-display font-black text-lg">
                        {isTopThree ? (
                          <span style={{ color: topThreeColor }}>{rank}</span>
                        ) : (
                          rank
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-full flex-shrink-0 grid place-items-center text-xs font-display font-black text-primary-foreground overflow-hidden"
                            style={{
                              backgroundColor: player.avatarUrl ? "transparent" : player.avatarColor,
                            }}
                          >
                            {player.avatarUrl ? (
                              <img
                                src={player.avatarUrl}
                                alt={player.username}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              player.username.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{player.username}</div>
                            <div className="text-xs text-muted-foreground">{player.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold text-primary">
                        {player.coins.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-green-400">{player.wins}</td>
                      <td className="py-4 px-4 text-right font-mono text-red-400">{player.losses}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GlowCard>
    </div>
  );
}