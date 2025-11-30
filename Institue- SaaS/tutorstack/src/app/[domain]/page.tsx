"use client";

import TenantNavbar from "@/components/tenant/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  ChartBar, 
  Briefcase, 
  MapPin, 
  Phone, 
  Star, 
  PlayCircle, 
  MonitorPlay, 
  Award,
  GraduationCap,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { use } from "react"; 
import Image from "next/image";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function TenantPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = use(params);
  const instituteName = domain ? domain.split(".")[0].toUpperCase() : "INSTITUTE";

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      <TenantNavbar domain={domain} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 z-0 pointer-events-none" />
        
        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center pt-10 lg:pt-0">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Admissions Open for 2025-26
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              {instituteName} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                CLASSES
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
              The most trusted institute in Kandivali. Where academic excellence meets a friendly, "Second Home" atmosphere. Est. 2006.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1">
                Book Free Demo
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent transition-all">
                <PlayCircle className="mr-2 h-5 w-5" /> View Toppers
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-slate-500">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-white overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 2,000+ Parents</p>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-[2.5rem] shadow-2xl border border-slate-700 rotate-2 hover:rotate-0 transition-transform duration-700 h-full w-full overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop" 
                 alt="Classroom" 
                 className="w-full h-full object-cover rounded-[2rem] opacity-80 hover:opacity-100 transition-opacity duration-700"
               />
               
               <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce border border-slate-100">
                 <div className="bg-green-100 p-3 rounded-full text-green-600">
                   <Trophy className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Highest Marks</p>
                   <p className="text-xl font-bold text-slate-900">98.5% Accounts</p>
                 </div>
               </div>

               <div className="absolute top-10 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">4.9 / 5.0</p>
                  <p className="text-xs text-slate-500">Google Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-12 bg-blue-600 text-white border-y border-blue-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/30">
            {[
              { label: "Years of Excellence", value: 19 },
              { label: "Students Mentored", value: 10000 },
              { label: "Toppers Produced", value: 500 },
              { label: "Google Rating", value: 4.8, isDecimal: true },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <h3 className="text-4xl md:text-5xl font-bold mb-1">
                  <CountUp end={stat.value} duration={2.5} decimals={stat.isDecimal ? 1 : 0} />
                  {stat.label !== "Google Rating" && "+"}
                </h3>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wider opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COURSES GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Programs</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Specialized Batches</h2>
            <p className="text-lg text-slate-600">Expert coaching tailored for every stage of your commerce journey.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "11th & 12th Commerce", icon: BookOpen, desc: "Build a strong foundation. Accounts, Economics, OCM & SP." },
              { title: "CA Foundation", icon: ChartBar, desc: "Rigorous prep for Chartered Accountancy entrance. Mock tests included." },
              { title: "CS Executive", icon: Briefcase, desc: "Specialized theory batches for Company Secretary aspirants." },
            ].map((course, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <course.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{course.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  View Syllabus <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Kandivali Loves Pinkal Sir</h2>
          <p className="text-slate-500 mt-4">More than just a coaching class. A community of achievers.</p>
        </div>
        
        <div className="flex justify-center gap-6 flex-wrap">
           {[
             { title: "HD Video Backups", icon: MonitorPlay, text: "Never miss a class. Access recorded lectures 24/7." },
             { title: "Smart Notes", icon: BookOpen, text: "Concise PDF notes designed for last-minute revision." },
             { title: "Weekly Tests", icon: Award, text: "Computer-based tests with instant results and analysis." }
           ].map((feature, i) => (
             <div key={i} className="w-full md:w-[350px] p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                   <feature.icon className="h-6 w-6" />
                 </div>
                 <h3 className="font-bold text-lg text-slate-900">{feature.title}</h3>
               </div>
               <p className="text-slate-600 leading-relaxed">{feature.text}</p>
             </div>
           ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-8">Visit Our Campus</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-full"><MapPin className="h-6 w-6 text-blue-400" /></div>
                <div>
                    <h4 className="font-bold text-lg mb-1">Main Branch</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Shop No. 27, Lower Ground Floor, <br/>
                      <strong>Mahavir Nagar</strong>, Kandivali West, <br/>
                      Mumbai, Maharashtra 400067
                    </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-800 rounded-full"><Phone className="h-6 w-6 text-blue-400" /></div>
                <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-slate-400">+91 98200 98200</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-4 text-slate-400">
                    <li><a href="#" className="hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition">Our Faculty</a></li>
                    <li><a href="#" className="hover:text-white transition">Testimonials</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-6">Legal</h4>
                <ul className="space-y-4 text-slate-400">
                    <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © 2025 {instituteName} Classes. Powered by TutorStack SaaS.
        </div>
      </section>
    </div>
  );
}