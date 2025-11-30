"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, AlertCircle } from "lucide-react";
import { MOCK_DB } from "@/lib/mock-db";
import { useEffect, useState } from "react";
import CountUp from "react-countup"; 

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem("tutorstack_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Safe fallback to prevent crash
  const tenantId = user?.tenant_id || 'pinkal';
  
  // Filter data dynamically based on logged in admin's tenant
  const myStudents = MOCK_DB.users.filter(u => u.tenant_id === tenantId && u.role === 'student');
  const myCourses = MOCK_DB.courses.filter(c => c.tenant_id === tenantId);
  
  const totalStudents = myStudents.length;
  const totalFeesDue = myStudents.reduce((sum, s) => sum + (s.stats?.fees_due || 0), 0);
  const lowAttendanceStudents = myStudents.filter(s => s.stats?.attendance < 80).length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Institute Overview ({tenantId.toUpperCase()})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg p-6 border-l-4 border-l-blue-500 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Students</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-1">
                <CountUp end={totalStudents} duration={2} />
              </h3>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="shadow-lg p-6 border-l-4 border-l-red-500 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-red-700">Total Fees Due</p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">
                ₹ <CountUp end={totalFeesDue} duration={2} separator="," />
              </h3>
            </div>
            <DollarSign className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="shadow-lg p-6 border-l-4 border-l-yellow-500 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-yellow-700">Attendance Alert</p>
              <h3 className="text-4xl font-bold text-yellow-600 mt-1">
                <CountUp end={lowAttendanceStudents} duration={1.5} />
              </h3>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="shadow-lg p-6 border-l-4 border-l-green-500 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Courses</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-1">
                <CountUp end={myCourses.length} duration={1.5} />
              </h3>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>
    </div>
  );
}