import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function TenantNavbar({ domain }: { domain: string }) {
  const instituteName = domain.split(".")[0].toUpperCase();

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition duration-300">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            {instituteName} <span className="text-blue-600">CLASSES</span>
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
              All Courses
            </Link>
          </div>
          
          {/* UPDATED: Button now just says 'Login' */}
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md px-6">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
