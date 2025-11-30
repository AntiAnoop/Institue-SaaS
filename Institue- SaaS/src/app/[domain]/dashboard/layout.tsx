"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, CalendarCheck, FileText, LogOut, Menu, GraduationCap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ domain: string }> 
}) {
  const { domain } = use(params);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const instituteName = domain ? domain.split(".")[0].toUpperCase() : "INSTITUTE";

  useEffect(() => {
    const storedUser = localStorage.getItem("tutorstack_user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div className="h-screen flex items-center justify-center bg-slate-50">Loading Portal...</div>;

  const navItems = [
    { name: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
    { name: "Attendance", href: "/dashboard/student/attendance", icon: CalendarCheck },
    { name: "Exam Results", href: "/dashboard/student/exams", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className={cn("fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col", isSidebarOpen ? "w-64" : "w-20")}>
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          {isSidebarOpen ? <span className="font-bold text-xl tracking-wider">{instituteName}</span> : <GraduationCap className="h-8 w-8 text-blue-500" />}
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={cn("flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group", isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" : "text-slate-400 hover:bg-slate-800 hover:text-white")}>
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" onClick={() => { localStorage.removeItem("tutorstack_user"); router.push("/login"); }} className={cn("w-full flex items-center gap-3 text-red-400 hover:bg-red-950/30 hover:text-red-300", !isSidebarOpen && "justify-center px-0")}>
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>
      <div className={cn("flex-1 flex flex-col transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        <header className="h-16 bg-white border-b sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu className="h-6 w-6 text-slate-600" /></Button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block"><p className="text-sm font-bold text-slate-900">{user?.name}</p><p className="text-xs text-slate-500">{user?.class}</p></div>
            <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold">{user?.name?.charAt(0)}</div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}