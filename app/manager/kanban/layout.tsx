export default function KanbanLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-screen">{children}</div>;
}
