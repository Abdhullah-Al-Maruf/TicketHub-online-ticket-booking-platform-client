import Navbar from "@/components/shared/Navbar";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
    
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* <Footer /> */}
    </div>
  );
}