import { VideoPlayer } from "@/components/lms/VideoPlayer";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

export default function CoursePlayer({ params }: { params: { courseId: string } }) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Video Area */}
      <div className="lg:col-span-2">
         <VideoPlayer title="Lecture 1: Introduction to Partnership" videoId="dQw4w9WgXcQ" />
         
         <div className="mt-8 border-t pt-6">
            <h3 className="font-bold text-lg mb-4">Lecture Notes</h3>
            <Card className="p-4 bg-slate-50 border-dashed text-center text-slate-500 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
               Download PDF Notes for this Chapter
            </Card>
         </div>
      </div>

      {/* Sidebar Playlist */}
      <div className="bg-white rounded-xl border shadow-sm h-fit">
        <div className="p-4 border-b bg-slate-50 rounded-t-xl">
          <h3 className="font-bold">Course Content</h3>
          <p className="text-xs text-slate-500">12 Lessons • 24h Total</p>
        </div>
        <div className="divide-y max-h-[500px] overflow-y-auto">
          {[1,2,3,4,5,6].map((i) => (
             <div key={i} className="p-4 hover:bg-slate-50 cursor-pointer flex gap-3 items-start">
                {i === 1 ? <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> : <Circle className="h-5 w-5 text-slate-300 mt-0.5" />}
                <div>
                   <p className={'text-sm font-medium ' + (i === 1 ? 'text-blue-600' : 'text-slate-700')}>
                     Lecture {i}: {i === 1 ? 'Introduction' : 'Advanced Concepts'}
                   </p>
                   <p className="text-xs text-slate-400">45 mins</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}