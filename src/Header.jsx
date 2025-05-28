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
      <div ref={headerRef} className="header fixed top-0 w-full z-50 backdrop-blur-md border-b" style={{backgroundColor: 'rgba(34, 40, 49, 0.9)', borderColor: 'rgba(57, 62, 70, 0.8)'}}>
        <header className="font-hk-grotesk flex items-center justify-between px-6 py-4">
          <div ref={logoRef} className="flex gap-3 items-center">
            <h1 className="text-3xl font-black text-white tracking-wider">Carbone™</h1>
            <span className="text-xl" style={{color: '#A3F7BF'}}>×</span>
            <img className="w-32 filter" style={{filter: 'brightness(0) saturate(100%) invert(85%) sepia(18%) saturate(1352%) hue-rotate(95deg) brightness(103%) contrast(96%)'}} src="/genesii-logo-black.svg" alt="Genesii" />
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

      {/* Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-80 h-full backdrop-blur-xl z-40 transform translate-x-full opacity-0"
        style={{backgroundColor: 'rgba(34, 40, 49, 0.95)'}}
      >
        <div className="pt-20 px-8">
          <nav className="space-y-6">
            <a href="/profile" className="block text-white text-xl font-medium transition-colors" style={{'&:hover': {color: '#29A19C'}}}>
              Profil
            </a>
            <a href="/contacts" className="block text-white text-xl font-medium transition-colors" style={{'&:hover': {color: '#29A19C'}}}>
              Enregistrements
            </a>
            <a href="/terms" className="block text-white text-xl font-medium transition-colors" style={{'&:hover': {color: '#29A19C'}}}>
              Termes et Conditions
            </a>
          </nav>
        </div>
      </div>

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30"
          style={{backgroundColor: 'rgba(34, 40, 49, 0.5)'}}
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

export default Header;
