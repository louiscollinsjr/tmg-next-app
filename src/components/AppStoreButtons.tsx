'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AppStoreButtonsProps {
  center?: boolean;
}

export default function AppStoreButtons({ center }: AppStoreButtonsProps) {
  return (
    <div className={cn("flex gap-6 pt-10", center && "justify-center")}>
      <div className="w-[135px] md:w-[156px] h-[45px] relative opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src="/appstore_comingsoon.svg"
          alt="Download on the App Store"
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>
      <div className="w-[135px] md:w-[156px] h-[45px] relative opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src="/googleplay.svg"
          alt="Get it on Google Play"
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>
    </div>
  );
}
