"use client";

import { useState, use } from "react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/mock-db";

export default function LoginPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = use(params);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const instituteName = domain ? domain.split(".")[0].toUpperCase() : "INSTITUTE";

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const mobile = formData.get('mobile') as string;
    const password = formData.get('password') as string;
    const tenantId = domain?.split(".")[0] || "pinkal"; 
    
    // *** CRITICAL: PASS PASSWORD ***
    const result = await loginUser(mobile, password, tenantId); 

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      localStorage.setItem("tutorstack_user", JSON.stringify(result.user));
      
      if (result.user.role === 'admin') {
          window.location.href = "/dashboard/admin";
      } else {
          window.location.href = "/dashboard/student";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 relative">
       <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-blue-600 w-full"></div>
        <CardHeader className="space-y-1 flex flex-col items-center text-center bg-white pt-8">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Institute Portal</CardTitle>
          <CardDescription>
            Login to <strong>{instituteName} CLASSES</strong>
          </CardDescription>
        </CardHeader>
        
        <form action={handleLogin}>
          <CardContent className="space-y-4 bg-white">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-slate-600">Mobile Number</Label>
              <Input id="mobile" name="mobile" type="text" placeholder="e.g. 9876543210" className="h-12" autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-600">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="h-12" />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
          </CardContent>

          <CardFooter className="bg-white pb-8 pt-2">
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12 shadow-lg">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In securely"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}