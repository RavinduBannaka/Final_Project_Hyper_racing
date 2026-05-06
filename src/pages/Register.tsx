import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/reactbits/GlowCard";
import { MagnetButton } from "@/components/reactbits/MagnetButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "../services/appwriteRegister";

export default function Register() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setError("Callsign, email, and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await registerUser({
        displayName,
        email,
        password,
        bio,
        profilePicUrl,
      });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("already exists") || err.message.includes("user_already_exists")) {
          setError("An account with this email already exists. Please log in.");
        } else {
          setError(err.message || "Registration failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-16 max-w-md">
      <SectionTitle eyebrow="// Auth" title="Create racer" />
      <GlowCard className="mt-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2"><Label htmlFor="user">Callsign</Label><Input id="user" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={isLoading} /></div>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} /></div>
          <div className="space-y-2"><Label htmlFor="bio">Bio</Label><Input id="bio" type="text" placeholder="Optional" value={bio} onChange={(e) => setBio(e.target.value)} disabled={isLoading} /></div>
          <div className="space-y-2"><Label htmlFor="profilePic">Profile Picture URL</Label><Input id="profilePic" type="text" placeholder="Optional" value={profilePicUrl} onChange={(e) => setProfilePicUrl(e.target.value)} disabled={isLoading} /></div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}
          <MagnetButton type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Creating account..." : "Start engines"}</MagnetButton>
          <p className="text-center text-sm text-muted-foreground">Already racing? <Link className="text-primary hover:underline" to="/login">Sign in</Link></p>
        </form>
      </GlowCard>
    </div>
  );
}