import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
               {/* Brand Header */}
          <div className="flex flex-col items-center">
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
              <span className="text-2xl  font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#f3a] to-[#b76dff]">
                TicketHub
              </span>
            </Link>
          </div>
        </div>
    );
};

export default Logo;