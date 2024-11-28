'use client';

import { usePathname } from 'next/navigation';
import PrelaunchNavigation from './PrelaunchNavigation';
import PostlaunchNavigation from './PostlaunchNavigation';
import { isPostLaunchPath } from '@/config/navigation';

interface NavigationWrapperProps {
  forcePrelaunch?: boolean;
}

export default function NavigationWrapper({ forcePrelaunch = false }: NavigationWrapperProps) {
  const pathname = usePathname();
  
  // If forcePrelaunch is true, always show prelaunch navigation
  // Otherwise, check if the current path should use post-launch navigation
  const shouldShowPrelaunch = forcePrelaunch || !isPostLaunchPath(pathname);

  return shouldShowPrelaunch ? <PrelaunchNavigation /> : <PostlaunchNavigation />;
}
