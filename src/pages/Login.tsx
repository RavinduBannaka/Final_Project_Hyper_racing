import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { account } from "@/services/appwriteClient";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      await refreshUser();
      navigate("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-16 max-w-md">
      <SectionTitle eyebrow="// Auth" title="Sign in" />
      <GlowCard className="mt-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} /></div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <MagnetButton type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Signing in..." : "Enter the grid"}</MagnetButton>
          <p className="text-center text-sm text-muted-foreground">No account? <Link className="text-primary hover:underline" to="/register">Create one</Link></p>
        </form>
      </GlowCard>
    </div>
  );
}