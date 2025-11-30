import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <nav className="w-full p-6 flex justify-between items-center border-b">
        <div className="text-2xl font-bold text-blue-600">TutorStack</div>
        <Link 
          href="http://app.localhost:3000/login" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Institute Login
        </Link>
      </nav>

      <main className="flex flex-col items-center text-center mt-20 px-4">
        <h1 className="text-6xl font-extrabold tracking-tight">
          The Operating System for <br />
          <span className="text-blue-600">Coaching Institutes</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Manage students, fees, attendance, and video lectures in one unified platform. 
          White-labeled for your brand.
        </p>
        
        <div className="mt-10 flex gap-4">
          <button className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium">
            Get Started for Free
          </button>
          <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-medium border">
            View Demo
          </button>
        </div>
      </main>
    </div>
  );
}