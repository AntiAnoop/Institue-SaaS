"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarCheck, 
  FileText, 
  LogOut, 
  Menu, 
  GraduationCap, 
  Users, 
  DollarSign,
  Upload
} from "lucide-react";
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
  
  // Extract institute name (e.g., pinkal.localhost -> PINKAL)
  const instituteName = domain ? domain.split(".")[0].toUpperCase() : "INSTITUTE";

  useEffect(() => {
    const storedUser = localStorage.getItem("tutorstack_user");
    if (!storedUser) {
      router.push("/login"); 
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // --- SECURITY: Role-Based Redirect ---
      // Prevent Students from accessing Admin pages
      if (parsedUser.role === 'student' && pathname.includes('/admin')) {
         router.replace("/dashboard/student");
      }
      // Prevent Admins from getting stuck on Student pages (optional, but good UX)
      if (parsedUser.role === 'admin' && pathname.includes('/student')) {
         router.replace("/dashboard/admin");
      }
    }
  }, [pathname, router]);

  // Show loading state until user is checked
  if (!user) return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 animate-pulse">Loading Portal...</div>;

  // Dynamic Navigation based on Role
  const navItems = user.role === 'admin' 
    ? [
        { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Students", href: "/dashboard/admin/users", icon: Users },
        { name: "Fees", href: "/dashboard/admin/fees", icon: DollarSign },
        { name: "Content", href: "/dashboard/admin/content", icon: Upload },
      ]
    : [
        { name: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
        { name: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
        { name: "Attendance", href: "/dashboard/student/attendance", icon: CalendarCheck },
        { name: "Exams", href: "/dashboard/student/exams", icon: FileText },
      ];

  const handleSignOut = () => {
    localStorage.removeItem("tutorstack_user");
    // Force full reload to clear any state
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl", 
        isSidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
      )}>
        {/* Header */}
        <div className="h-16 flex items-center justify-center px-4 border-b border-slate-800 overflow-hidden">
           <GraduationCap className="h-8 w-8 text-blue-500 flex-shrink-0" />
           {isSidebarOpen && (
             <span className="ml-3 font-bold text-lg tracking-wider truncate">{instituteName}</span>
           )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                
                {/* Tooltip for collapsed state */}
                {!isSidebarOpen && (
                  <div className="hidden md:group-hover:block absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded z-50 whitespace-nowrap border border-slate-700">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Sign Out */}
        <div className="p-4 border-t border-slate-800">
          <Button 
            variant="ghost" 
            onClick={handleSignOut} 
            className={cn(
              "w-full flex items-center gap-3 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300", 
        isSidebarOpen ? "ml-64" : "ml-0 md:ml-20"
      )}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-30">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6 text-slate-600" />
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role} • {user?.tenant_id?.toUpperCase()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}