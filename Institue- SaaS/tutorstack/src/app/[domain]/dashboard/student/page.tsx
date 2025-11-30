import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, TrendingUp, AlertCircle } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Good Afternoon! 👋</h1>
        <p className="text-blue-100 mb-6">Upcoming: <span className="font-bold text-white">Accounts Live Class</span> at 5:00 PM.</p>
        <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold border-0"><PlayCircle className="mr-2 h-5 w-5" /> Join Now</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500 shadow-sm p-4"><h3 className="font-bold text-slate-500">Attendance</h3><p className="text-3xl font-bold">92%</p></Card>
        <Card className="border-l-4 border-l-blue-500 shadow-sm p-4"><h3 className="font-bold text-slate-500">Avg Score</h3><p className="text-3xl font-bold">85/100</p></Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm p-4 bg-red-50"><h3 className="font-bold text-red-500">Fees Due</h3><p className="text-3xl font-bold text-red-600">₹ 10,000</p></Card>
      </div>
    </div>
  );
}