import Navbar from "./NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
