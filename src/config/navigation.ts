// List of paths that should use the post-launch navigation
export const postLaunchPaths = new Set([
  '/dashboard',
  '/find-pros',
  '/projects',
  '/about',
  '/profile',
  '/settings',
]);

// Function to check if current path should use post-launch navigation
export function isPostLaunchPath(pathname: string): boolean {
  // Check if the exact path exists in the set
  if (postLaunchPaths.has(pathname)) {
    return true;
  }

  // Check if any parent path matches
  // This handles nested routes like /dashboard/settings
  return Array.from(postLaunchPaths).some(path => 
    pathname.startsWith(path + '/')
  );
}
