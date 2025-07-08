import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-screen flex-col">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
