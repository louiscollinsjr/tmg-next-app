import HelpProvider from '@/components/HelpProvider';

// This would eventually come from your authentication system
const mockUser = {
  name: 'John' // Remove this when you implement real auth
};

export default function HelpPage() {
  // In the future, you would get the user from your auth system
  const userName = mockUser?.name;

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <HelpProvider userName={userName} />
    </div>
  );
}
