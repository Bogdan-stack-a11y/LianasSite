import React, { useState } from 'react';
import Landing from './components/Landing';
import Admin from './components/Admin';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');

  React.useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Hash Router
  const renderRoute = () => {
    if (currentRoute.startsWith('#/admin')) {
      return <Admin />;
    }
    return <Landing />;
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      {renderRoute()}
    </div>
  );
}
