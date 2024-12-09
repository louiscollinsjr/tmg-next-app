'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AppStoreButtonsProps {
  center?: boolean;
}

export default function AppStoreButtons({ center }: AppStoreButtonsProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-6 ~pt-10/40 items-start", center && "sm:items-center sm:justify-center")}>
      <div className="~w-40/96 ~h-14/32 relative opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src="/appstore.svg"
          alt="Download on the App Store"
          fill
          className="object-contain drop-shadow-sm "
          priority
        />
      </div>
      <div className="~w-40/96 ~h-14/32 relative opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src="/googleplay.svg"
          alt="Get it on Google Play"
          fill
         className="object-contain drop-shadow-sm w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
