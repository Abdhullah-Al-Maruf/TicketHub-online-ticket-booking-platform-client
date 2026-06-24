import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div
      className=" min-h-screen bg-[#161020] text-[#eadef5] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#b76dff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 " />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#f3aeff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 "
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle Grid Pattern Overlay for Tech/SaaS feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#eadef5 1px, transparent 1px), linear-gradient(90deg, #eadef5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Glassmorphism Card */}
        <div className="w-full bg-[#231d2d]/70 backdrop-blur-xl border border-[#4d4354] rounded-xl shadow-lg shadow-black/30 p-8 sm:p-10 transition-all duration-300">
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Logo Icon */}
             <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <DotLottieReact
                  src="/Ticket-animation.json" // Place your file in the 'public' folder
                  loop
                  autoplay
                  className="w-full h-full scale-150"
                />
              </div>
              {/* Brand Name */}
              <span className="text-2xl  font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#f3aeff] to-[#ddb7ff]">
                TicketHub
              </span>
            </Link>
          </div>

          {/* Dynamic Form Content (Login / Register) */}
          {children}
        </div>

        {/* Footer / Legal */}
        <div className="text-center mt-6 text-[#988d9f] text-sm font-medium">
          <p>© 2026 TicketHub. Secure & Encrypted.</p>
        </div>
      </div>
    </div>
  );
}
