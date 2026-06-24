// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TicketHub - Next Generation of Travel",
  description: "Book tickets for events, travel, and more on TicketHub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Toaster position="top-center" />
       
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}