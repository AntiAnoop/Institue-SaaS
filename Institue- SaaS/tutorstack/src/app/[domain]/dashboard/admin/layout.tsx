export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="min-h-screen bg-slate-900 text-white p-8">
        <h1 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4">Institute Admin Panel</h1>
        {children}
     </div>
  );
}