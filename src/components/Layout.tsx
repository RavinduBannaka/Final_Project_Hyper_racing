import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Aurora } from "./reactbits/Aurora";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip">
      <div className="fixed inset-0 -z-10 bg-aurora opacity-60" aria-hidden />
      <div className="fixed inset-0 -z-10" aria-hidden>
        <Aurora />
      </div>
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}