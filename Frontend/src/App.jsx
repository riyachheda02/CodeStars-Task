import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Events from './pages/Events';
import './App.css';

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = (window.location.hash || '').toLowerCase();
    const path = (window.location.pathname || '').toLowerCase();
    if (hash === '#/events' || hash === '#events' || path === '/events') {
      return 'events';
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase();
      if (hash === '#/events' || hash === '#events' || path === '/events') {
        setCurrentRoute('events');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (route) => {
    if (route === 'events') {
      window.location.hash = '#events';
      setCurrentRoute('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '#';
      setCurrentRoute('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return currentRoute === 'events' ? (
    <Events onNavigate={navigateTo} />
  ) : (
    <Home onNavigate={navigateTo} />
  );
}

export default App;
