"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_DB } from '@/lib/mock-db';
import { 
    Users, Search, Filter, ArrowUpDown, 
    AlertCircle, CheckCircle2, DollarSign, 
    Download, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentManagementPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("tutorstack_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const tenantId = user?.tenant_id || 'pinkal';
  
  // 1. Get Raw Data
  const allStudents = useMemo(() => {
      return MOCK_DB.users.filter(u => u.tenant_id === tenantId && u.role === 'student');
  }, [tenantId]);

  // 2. Get Unique Batches for Dropdown
  const batches = useMemo(() => {
      return ["All", ...Array.from(new Set(allStudents.map(s => s.batch)))];
  }, [allStudents]);

  // 3. Filter & Sort Logic
  const filteredStudents = useMemo(() => {
      let result = [...allStudents];

      // Filter by Search
      if (searchTerm) {
          const lowerTerm = searchTerm.toLowerCase();
          result = result.filter(s => 
              s.name.toLowerCase().includes(lowerTerm) || 
              s.mobile.includes(lowerTerm)
          );
      }

      // Filter by Batch
      if (filterBatch !== "All") {
          result = result.filter(s => s.batch === filterBatch);
      }

      // Sorting
      result.sort((a: any, b: any) => {
          let valA = sortConfig.key === 'name' ? a.name : a.stats[sortConfig.key];
          let valB = sortConfig.key === 'name' ? b.name : b.stats[sortConfig.key];

          if (typeof valA === 'string') {
              valA = valA.toLowerCase();
              valB = valB.toLowerCase();
          }

          if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
      });

      return result;
  }, [allStudents, searchTerm, filterBatch, sortConfig]);

  const handleSort = (key: string) => {
      setSortConfig(current => ({
          key,
          direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
      }));
  };

  if (!isClient) return null;

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
            <p className="text-slate-500 text-sm mt-1">Total Students: {allStudents.length} • Active Batch: {filterBatch}</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="border-slate-300 text-slate-700">
                <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> Add Student
            </Button>
        </div>
      </div>

      {/* --- Controls --- */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center bg-white border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
                placeholder="Search by Name or Mobile..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
            />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-slate-500" />
            <select 
                className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
            >
                {batches.map(b => <option key={b} value={b}>{b === 'All' ? 'All Batches' : b}</option>)}
            </select>
        </div>
      </Card>

      {/* --- Data Table --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4 cursor-pointer hover:text-blue-600 flex items-center gap-1" onClick={() => handleSort('name')}>
                Student Details <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center gap-1" onClick={() => handleSort('attendance')}>
                Attendance <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center gap-1" onClick={() => handleSort('marks')}>
                Performance <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center gap-1" onClick={() => handleSort('fees_due')}>
                Fee Status <ArrowUpDown className="h-3 w-3" />
            </div>
            <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 p-4 items-center hover:bg-blue-50/30 transition-colors group">
                        
                        {/* Name & Info */}
                        <div className="col-span-4">
                            <div className="font-bold text-slate-900">{student.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                <span>{student.mobile}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-blue-600 font-medium">{student.batch}</span>
                            </div>
                        </div>

                        {/* Attendance */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-slate-100 h-2 rounded-full max-w-[80px] overflow-hidden">
                                    <div 
                                        className={cn("h-full rounded-full", student.stats.attendance < 75 ? "bg-red-500" : "bg-green-500")} 
                                        style={{ width: `${student.stats.attendance}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-slate-700">{student.stats.attendance}%</span>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="col-span-2">
                            <span className={cn("px-2 py-1 rounded text-xs font-bold", 
                                student.stats.marks >= 90 ? "bg-purple-100 text-purple-700" :
                                student.stats.marks >= 70 ? "bg-blue-100 text-blue-700" :
                                "bg-orange-100 text-orange-700"
                            )}>
                                {student.stats.marks}/100 Avg
                            </span>
                        </div>

                        {/* Fees */}
                        <div className="col-span-2">
                            {student.stats.fees_due > 0 ? (
                                <div className="flex items-center gap-1 text-red-600 text-sm font-bold">
                                    <AlertCircle className="h-4 w-4" />
                                    ₹{student.stats.fees_due.toLocaleString()}
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Paid
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit</span>
                                ✏️
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                                🗑️
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-12 text-center text-slate-500">
                    No students found matching your search.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}