import { PlayCircle } from "lucide-react";

export function VideoPlayer({ title, videoId }: { title: string, videoId: string }) {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
        <iframe 
          className="w-full h-full"
          src={'https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1'} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
          <PlayCircle className="w-4 h-4" /> Mark as Complete
        </button>
      </div>
    </div>
  );
}