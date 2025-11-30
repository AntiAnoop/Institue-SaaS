import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function AttendancePage() {
  // Mock Calendar Grid (30 Days)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <div className="flex gap-4 text-sm">
           <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Present</span>
           <span className="flex items-center gap-1"><XCircle className="h-4 w-4 text-red-500" /> Absent</span>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex justify-between items-center">
           <h2 className="font-bold text-xl">November 2025</h2>
           <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">92% Present</span>
        </div>
        
        <div className="grid grid-cols-7 gap-4 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
             <div key={d} className="text-slate-400 text-xs font-bold uppercase">{d}</div>
          ))}
          
          {days.map((day) => {
            // Mock logic: Absent on days divisible by 9
            const isAbsent = day % 9 === 0;
            const isWeekend = day % 7 === 0 || day % 7 === 6;
            
            return (
              <div key={day} className="flex flex-col items-center gap-1 min-h-[60px]">
                <span className="text-sm text-slate-700 font-medium">{day}</span>
                {!isWeekend && (
                   isAbsent ? 
                   <XCircle className="h-6 w-6 text-red-500" /> : 
                   <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  );
}