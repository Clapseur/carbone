import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  };

  return (
    <>
      <div ref={headerRef} className="header fixed top-0 w-full z-50 backdrop-blur-md border-b glass-header">
        <header className="font-hk-grotesk flex items-center justify-between px-6 py-4">
          <div ref={logoRef} className="flex gap-3 items-center">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wider">Carbone™</h1>
            <span className="text-sm sm:text-lg md:text-xl" style={{color: '#A3F7BF'}}>×</span>
            <img className="w-20 sm:w-28 md:w-32 filter" style={{filter: 'brightness(0) saturate(100%) invert(85%) sepia(18%) saturate(1352%) hue-rotate(95deg) brightness(103%) contrast(96%)'}} src="/genesii-logo-black.svg" alt="Genesii" />
          </div>
          
          {/* Menu Hamburger */}
          <button 
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center space-y-1 group"
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{backgroundColor: '#A3F7BF'}}></span>
            <span className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{backgroundColor: '#A3F7BF'}}></span>
            <span className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{backgroundColor: '#A3F7BF'}}></span>
          </button>
        </header>
      </div>

      {/* Menu mobile */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-80 glass-menu z-40 transform translate-x-full opacity-0"
      >
        <div className="pt-20 px-6">
          <nav className="space-y-6">
            <a href="#" className="block text-xl font-semibold text-white hover:text-green-300 transition-colors">
              Accueil
            </a>
            <a href="#histoire" className="block text-xl font-semibold text-white hover:text-green-300 transition-colors">
              À propos
            </a>
            <a href="#tester" className="block text-xl font-semibold text-white hover:text-green-300 transition-colors">
              Explorer
            </a>
          </nav>
          
          <div className="mt-12 pt-6 border-t border-white/20">
            <p className="text-sm text-gray-300 font-thunder">
              Carbone × Genesii
            </p>
            <p className="text-xs text-gray-400 mt-2 font-thunder">
              Créer des liaisons professionnelles
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}

export default Header;
