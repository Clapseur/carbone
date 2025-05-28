import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header.jsx";
import HomePage from "./components/HomePage.jsx";
import BondProfile from "./components/BondProfile.jsx";
import NoiseEffect from "./components/NoiseEffect.jsx";
import Aurora from "./AuroraBackground.jsx";

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        <Aurora
          colorStops={["#0f0f23", "#1a1a2e", "#16213e"]}
          blend={0.7}
          amplitude={0.3}
          speed={0.3}
        />
        <NoiseEffect />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:bondId" element={<BondProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
