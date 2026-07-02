import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
               {/* Brand Header */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Logo Icon */}
              <div className=" flex items-center justify-center shrink-0">
               <Image
               src={"/logo.png"}
               width={150}
               alt='logo'
               height={150}
               />
              </div>
              {/* Brand Name
              <span className="text-2xl  font-bold tracking-tight bg-clip-text text-transparent ">
                TicketHub
              </span> */}
            </Link>
          </div>
        </div>
    );
};

export default Logo;