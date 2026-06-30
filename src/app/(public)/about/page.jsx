import React from "react";
import { Button } from "@heroui/react";


import { ShieldCheck } from "@gravity-ui/icons";
import { FaUserSecret } from "react-icons/fa";
import { FiZapOff } from "react-icons/fi";
import { BsAward } from "react-icons/bs";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-[#c084fc]" />,
      title: "Uncompromising Security",
      description: "Every ticket transacted on our marketplace undergoes multi-layer vendor verification so you can move with absolute peace of mind.",
    },
    {
      icon: <FaUserSecret className="w-6 h-6 text-purple-600 dark:text-[#c084fc]" />,
      title: "Built for Community",
      description: "We bridge the gap between regional travel providers and everyday commuters, making local exploration seamlessly accessible.",
    },
    {
      icon: <FiZapOff className="w-6 h-6 text-purple-600 dark:text-[#c084fc]" />,
      title: "Instant Velocity",
      description: "Say goodbye to manual processing delays. Experience real-time seat tracking, rapid booking confirmations, and zero friction.",
    },
    {
      icon: <BsAward className="w-6 h-6 text-purple-600 dark:text-[#c084fc]" />,
      title: "Premium Standards",
      description: "From luxury line buses to elite regional flights, we partner exclusively with verified vendors committed to high hospitality markers.",
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 dark:bg-[#120d1a]/20 dark:text-white font-sans selection:bg-purple-200 dark:selection:bg-[#c084fc] selection:text-[#120d1a] transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,#c084fc15,transparent_50%)] pointer-events-none" />
        
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-[#c084fc]/10 border border-purple-200 dark:border-[#c084fc]/30 dark:text-[#c084fc] rounded-full text-xs font-semibold tracking-wider uppercase">
          Our Mission
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 dark:text-slate-100 max-w-3xl mx-auto leading-tight">
          Redefining the Rhythm of <span className="text-purple-600 dark:text-[#c084fc]">Modern Travel</span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We build robust transit infrastructure linking travelers to premium, vetted transport experiences. No lines, no stress—just seamless exploration at your fingertips.
        </p>
        
        <div className="pt-4">

            <Link href={"/all-tickets"}>
              <Button
            className="bg-purple-600 hover:bg-purple-700 dark:bg-[#c084fc] dark:hover:bg-[#b06bf2] text-white dark:text-[#120d1a] font-bold px-8 h-12 rounded-xl shadow-lg shadow-purple-500/10 dark:shadow-[#c084fc]/10 transition-transform active:scale-98 flex items-center justify-center gap-2 mx-auto"
          >
            Explore Marketplace <BiRightArrowAlt className="text-xl" />
          </Button>
            </Link>
        
        </div>
      </section>

      <hr className="border-slate-200 dark:border-[#2d223c] max-w-6xl mx-auto" />

      {/* Philosophy & Stats Split Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Why We Build the Future of Transport Ticket Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Finding verified, on-time regional transport shouldn't feel like a roll of the dice. We established this marketplace to streamline logistical communication between professional transport fleets and commuters. 
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            By unifying advanced real-time asset tracking with rigorous administrative background checks, we provide an ecosystem where vendors scale seamlessly and passengers book safely in under two minutes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 dark:bg-[#1a1424] dark:border-[#2d223c] rounded-2xl p-6 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-3xl font-black text-purple-600 dark:text-[#c084fc]">99.8%</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">On-Time Departure</p>
          </div>
          <div className="bg-white border border-slate-200 dark:bg-[#1a1424] dark:border-[#2d223c] rounded-2xl p-6 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-3xl font-black text-purple-600 dark:text-[#c084fc]">45k+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Happy Commuters</p>
          </div>
          <div className="bg-white border border-slate-200 dark:bg-[#1a1424] dark:border-[#2d223c] rounded-2xl p-6 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-3xl font-black text-purple-600 dark:text-[#c084fc]">120+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Verified Fleets</p>
          </div>
          <div className="bg-white border border-slate-200 dark:bg-[#1a1424] dark:border-[#2d223c] rounded-2xl p-6 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-3xl font-black text-purple-600 dark:text-[#c084fc]">2-4h</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Admin Review Speed</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-slate-100 border-y border-slate-200 dark:bg-[#1a1424] dark:border-[#2d223c] py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">The Principles That Move Us</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Whether you are an agency listing a premiere cross-country route or a weekend adventurer, our framework safeguards every journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {values.map((val, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 dark:bg-[#231b30] dark:border-[#362a4a] dark:hover:border-[#4c3b69] transition-all rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 dark:bg-[#c084fc]/10 dark:border-[#c084fc]/20 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{val.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center text-slate-800 dark:text-slate-100">Our Journey So Far</h2>
        
        <div className="relative border-l border-slate-200 dark:border-[#2d223c] ml-4 md:ml-32 space-y-12 text-left">
          
          {/* Milestone 1 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border border-white dark:bg-[#362a4a] dark:border-[#2d223c] group-hover:bg-purple-600 dark:group-hover:bg-[#c084fc] transition-colors" />
            <span className="absolute left-[-140px] hidden md:block text-right w-28 text-sm font-bold text-purple-600 dark:text-[#c084fc] top-1">
              Late 2024
            </span>
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-600 dark:text-[#c084fc] md:hidden block mb-1">Late 2024</span>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">The Spark</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Frustrated by disjointed booking portals and untrustworthy ticket listings, our founders map out a decentralized architecture prioritizing secure vendor checkouts.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border border-white dark:bg-[#362a4a] dark:border-[#2d223c] group-hover:bg-purple-600 dark:group-hover:bg-[#c084fc] transition-colors" />
            <span className="absolute left-[-140px] hidden md:block text-right w-28 text-sm font-bold text-purple-600 dark:text-[#c084fc] top-1">
              Mid 2025
            </span>
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-600 dark:text-[#c084fc] md:hidden block mb-1">Mid 2025</span>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">V1 Marketplace Engine</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Launched full native integration supporting programmatic asset tracking across 10 major commercial transport paths.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-purple-600 dark:bg-[#c084fc] ring-4 ring-purple-100 dark:ring-[#c084fc]/20" />
            <span className="absolute left-[-140px] hidden md:block text-right w-28 text-sm font-bold text-purple-600 dark:text-[#c084fc] top-1">
              Present Day
            </span>
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-600 dark:text-[#c084fc] md:hidden block mb-1">Present Day</span>
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Scaling Globally</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Supporting hundreds of certified transport networks with a sub-4-hour administrative review turnaround layout.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}