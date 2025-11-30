import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, Trophy } from "lucide-react";

export default function ExamsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Exams & Results</h1>
      
      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-semibold text-slate-500 mb-4 uppercase tracking-wider">Upcoming Tests</h2>
        <Card>
           <CardContent className="p-6 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                    <FileText className="h-6 w-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg">Weekly Test 5: Economics</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1"><Clock className="h-3 w-3" /> 60 Mins • 50 Marks</p>
                 </div>
              </div>
              <Button>Start Test</Button>
           </CardContent>
        </Card>
      </div>

      {/* Past Results */}
      <div>
        <h2 className="text-lg font-semibold text-slate-500 mb-4 uppercase tracking-wider">Past Results</h2>
        <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <Card key={i}>
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Accounts Chapter {i} Test</h3>
                        <p className="text-sm text-slate-500">Date: 12th Oct 2025</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">42/50</div>
                        <div className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                           <Trophy className="h-3 w-3" /> Rank #5
                        </div>
                    </div>
                </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
}