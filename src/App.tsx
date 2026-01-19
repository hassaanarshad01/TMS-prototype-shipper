import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'signin' | 'signup' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onSignIn={() => setCurrentPage('signin')}
            onSignUp={() => setCurrentPage('signup')}
          />
        );
      case 'signin':
        return (
          <SignIn
            onSignIn={handleSignIn}
            onSignUp={() => setCurrentPage('signup')}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'signup':
        return (
          <SignUp
            onSignIn={() => setCurrentPage('signin')}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'dashboard':
        return <Dashboard onSignOut={handleSignOut} />;
      default:
        return (
          <LandingPage
            onSignIn={() => setCurrentPage('signin')}
            onSignUp={() => setCurrentPage('signup')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      <Toaster />
    </div>
  );
}