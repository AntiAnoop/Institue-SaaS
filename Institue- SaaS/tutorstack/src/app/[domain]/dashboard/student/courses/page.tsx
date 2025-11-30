import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";

// Mock Data
const courses = [
  { id: "c1", title: "Accounts Masterclass", lessons: 12, duration: "24h" },
  { id: "c2", title: "Economics Crash Course", lessons: 8, duration: "16h" },
  { id: "c3", title: "OCM Revision", lessons: 15, duration: "30h" }
];

export default function CourseList() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition-shadow">
            <div className="h-32 bg-slate-200 rounded-t-xl flex items-center justify-center">
               <BookOpen className="h-12 w-12 text-slate-400" />
            </div>
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-slate-500 mb-4">
                <span className="flex gap-1 items-center"><BookOpen className="h-3 w-3" /> {c.lessons} Lessons</span>
                <span className="flex gap-1 items-center"><Clock className="h-3 w-3" /> {c.duration}</span>
              </div>
              <Link href={'/dashboard/student/courses/' + c.id}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}