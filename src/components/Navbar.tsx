import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GamingLogo } from "@/components/GamingLogo";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/maps", label: "Maps" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/community", label: "Community" },
  { to: "/store/coins", label: "Store" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <GamingLogo className="h-9 w-auto drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)] transition-transform group-hover:scale-105" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                  "after:absolute after:bottom-1 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300",
                  isActive
                    ? "text-primary after:w-6"
                    : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-6"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
                Hi, {user.name}
              </span>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    "hidden sm:inline relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                    "after:absolute after:bottom-1 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300",
                    isActive
                      ? "text-primary after:w-6"
                      : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-6"
                  )
                }
              >
                Profile
              </NavLink>
              <button
                onClick={handleSignOut}
                className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </>
          ) : !loading ? (
            <Link to="/login" className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
          ) : null}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm uppercase tracking-wider",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            {!loading && user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm uppercase tracking-wider",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  Profile
                </NavLink>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={handleSignOut}
                    className="flex-1 text-center px-3 py-2 rounded-md border border-border text-sm"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : !loading ? (
              <div className="mt-2 flex gap-2">
                <Link to="/login" className="flex-1 text-center px-3 py-2 rounded-md border border-border text-sm">Sign in</Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}