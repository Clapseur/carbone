import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header.jsx";
import HomePage from "./components/HomePage.jsx";
import BondProfile from "./components/BondProfile.jsx";
import Aurora from "./AuroraBackground.jsx";

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        <Aurora
          colorStops={["#9999a0", "#2a2a31", "#282831"]}
          blend={0.7}
          amplitude={0.3}
          speed={0.3}
        />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:bondId" element={<BondProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
