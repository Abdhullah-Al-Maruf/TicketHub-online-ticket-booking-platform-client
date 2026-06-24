import Logo from "@/components/shared/Logo";


export default function AuthLayout({ children }) {
  return (
    <div
      className=" min-h-screen bg-[var(--background)] text-[var(--on-surface)] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary-container)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 " />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--tertiary)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 "
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle Grid Pattern Overlay for Tech/SaaS feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Glassmorphism Card */}
        <div className="w-full bg-[var(--surface-container)]/70 backdrop-blur-xl border border-[var(--outline-variant)] rounded-xl shadow-lg shadow-black/30 p-8 sm:p-10 transition-all duration-300">
          {/* Brand Header */}
         <div className="mb-4">
          <Logo/>
         </div>

          {/* Dynamic Form Content (Login / Register) */}
          {children}
        </div>

        {/* Footer / Legal */}
        <div className="text-center mt-6 text-[var(--outline)] text-sm font-medium">
          <p>© 2026 TicketHub. Secure & Encrypted.</p>
        </div>
      </div>
    </div>
  );
}