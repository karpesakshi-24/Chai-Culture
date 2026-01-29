import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EmailSignup from './components/EmailSignup';
import Footer from './components/Footer';
import BackgroundEffects from './components/Backgroundeffects';
import './styles/App.css';

function App() {
  // Set your launch date here (YYYY-MM-DD format)
  const launchDate = "2026-04-01T00:00:00";

  return (
    <div className="App">
      <BackgroundEffects />
      <div className="container">
        <Header />
        <main className="hero">
          <Hero />
          <Countdown launchDate={launchDate} />
          <EmailSignup />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;