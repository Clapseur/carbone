import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import VideoText from "./VideoText";

// Black Hole Background Component
const BlackHoleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Black hole animation
    const particles = [];
    const numParticles = 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw black hole center
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        200
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach((particle) => {
        // Gravitational pull towards center
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 50) {
          const force = 0.5 / distance;
          particle.vx += dx * force;
          particle.vy += dy * force;
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset if too close to center or out of bounds
        if (
          distance < 30 ||
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#09090B" }}
    />
  );
};

const HomePage = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const className = entry.target.className
              .split(" ")
              .find((cls) => cls.includes("-section"));
            if (className) {
              gsap.fromTo(
                entry.target,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
              );
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe sections
    const sections = document.querySelectorAll(
      ".story-section, .bonds-section, .network-section"
    );
    sections.forEach((section) => observer.observe(section));

    // Mouse movement effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="min-h-screen text-white overflow-hidden relative"
      style={{ backgroundColor: "#09090B" }}
    >
      {/* Black Hole Background */}
      <BlackHoleBackground />

      {/* Cursor follower with specified classes */}
      <div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: "#FFFFFF",
          transition: "all 0.1s ease-out",
        }}
      />

      {/* Hero Section - Mobile First */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden z-10"
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="hero-title mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-hk-grotesk mb-4">
              <VideoText
                text="CARBONE"
                videoSrc="/carboneTexte.mp4"
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-hk-grotesk"
              />
            </h1>
          </div>

          <div className="hero-subtitle mb-4 sm:mb-6">
            <h2
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              L'Element qui <h2 style={{ color: "#FFFFFF" }}>Unit Tout</h2> 
            </h2>
          </div>

          <div className="hero-description">
            <p
              className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#FFFFFF", opacity: 0.8 }}
            >
              Comme l'atome de carbone forme des liaisons essentielles à la vie,
              Carbone connecte les gens entre eux et crée des réseaux professionnels
              durables.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Mobile First */}
      <section className="story-section relative py-16 sm:py-24 md:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <h2
                className="text-2xl sm:text-4xl md:text-6xl font-black font-hk-grotesk mb-6 sm:mb-8"
                style={{ color: "#FFFFFF" }}
              >
                L'Histoire de Carbone
              </h2>
              <div
                className="space-y-4 sm:space-y-6 text-sm sm:text-lg leading-relaxed"
                style={{ color: "#FFFFFF", opacity: 0.8 }}
              >
                <p>
                  Le
                    carbone

                  est l'élément fondamental de la vie. Avec ses quatre électrons
                  de valence, il peut former jusqu'à quatre liaisons covalentes,
                  créant des structures complexes et durables.
                </p>
                <p>
                  De la même manière, notre plateforme{" "}
                  <span style={{ color: "#FFFFFF", fontWeight: "600" }}>
                    Carbone
                  </span>
                  permet aux alumni de créer des connexions multiples et
                  significatives, formant un réseau professionnel solide et
                  évolutif.
                </p>
                <p>
                  Chaque interaction, chaque rencontre lors d'événements alumni,
                  devient une{" "}
                  <span style={{ color: "#FFFFFF", fontWeight: "600" }}>
                    liaison
                  </span>{" "}
                  qui enrichit votre réseau et ouvre de nouvelles opportunités.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className="w-full h-64 sm:h-80 md:h-96 rounded-3xl backdrop-blur-sm border flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl mb-4">⚛️</div>
                  <p
                    className="font-semibold text-lg sm:text-xl"
                    style={{ color: "#FFFFFF" }}
                  >
                    Structure Moléculaire
                  </p>
                  <p style={{ color: "#FFFFFF", opacity: 0.6 }}>
                    4 liaisons • Infinie possibilités
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonds Visualization Section - Mobile First */}
      <section className="bonds-section relative py-16 sm:py-24 md:py-32 px-4 overflow-hidden z-10">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-4xl md:text-6xl font-black font-hk-grotesk mb-8 sm:mb-12 md:mb-16"
            style={{ color: "#FFFFFF" }}
          >
            Les Liaisons Carbone
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="group">
              <div
                className="p-6 sm:p-8 rounded-2xl border backdrop-blur-sm hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="text-4xl sm:text-5xl mb-4">🤝</div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  Liaison Simple
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "#FFFFFF", opacity: 0.8 }}
                >
                  Connexions directes entre client/partenanire et recruteur/chasseur de tête lors de vos événements networking
                </p>
              </div>
            </div>

            <div className="group">
              <div
                className="p-6 sm:p-8 rounded-2xl border backdrop-blur-sm hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="text-4xl sm:text-5xl mb-4">🔗</div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  Liaison Double
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "#FFFFFF", opacity: 0.8 }}
                >
                  Partenariats professionnels et collaborations durables
                </p>
              </div>
            </div>

            <div className="group sm:col-span-2 md:col-span-1">
              <div
                className="p-6 sm:p-8 rounded-2xl border backdrop-blur-sm hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="text-4xl sm:text-5xl mb-4">🌐</div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  Reseau Enrichis
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "#FFFFFF", opacity: 0.8 }}
                >
                  Fructifier votre réseau et générez des opportunités inouis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Effect Section - Mobile First */}
      <section className="network-section relative py-16 sm:py-24 md:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2
              className="text-2xl sm:text-4xl md:text-6xl font-black font-hk-grotesk mb-6 sm:mb-8"
              style={{ color: "#FFFFFF" }}
            >
              L'Effet Réseau
            </h2>
            <p
              className="text-sm sm:text-xl max-w-3xl mx-auto"
              style={{ color: "#FFFFFF", opacity: 0.8 }}
            >
              Comme les molécules organiques complexes, votre réseau
              professionnel se renforce à chaque nouvelle connexion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold"
                  style={{ backgroundColor: "#FFFFFF", color: "#09090B" }}
                >
                  1
                </div>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Événements Alumni
                  </h3>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#FFFFFF", opacity: 0.8 }}
                  >
                    Participez à des soirées networking exclusives et créez vos
                    premières liaisons.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold"
                  style={{ backgroundColor: "#FFFFFF", color: "#09090B" }}
                >
                  2
                </div>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Connexions Multiples
                  </h3>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#FFFFFF", opacity: 0.8 }}
                  >
                    Développez des relations avec des professionnels de
                    différents secteurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold"
                  style={{ backgroundColor: "#FFFFFF", color: "#09090B" }}
                >
                  3
                </div>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Écosystème Durable
                  </h3>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#FFFFFF", opacity: 0.8 }}
                  >
                    Votre réseau devient une structure solide d'opportunités
                    mutuelles.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="w-full h-64 sm:h-80 md:h-96 rounded-3xl backdrop-blur-sm border flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl mb-4">🧬</div>
                  <p
                    className="font-semibold text-lg sm:text-xl"
                    style={{ color: "#FFFFFF" }}
                  >
                    ADN Professionnel
                  </p>
                  <p style={{ color: "#FFFFFF", opacity: 0.6 }}>
                    Votre réseau unique et évolutif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl sm:text-4xl md:text-6xl font-black font-hk-grotesk mb-6 sm:mb-8"
            style={{ color: "#FFFFFF" }}
          >
            Rejoignez l'Écosystème Carbone
          </h2>
          <p
            className="text-sm sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto"
            style={{ color: "#FFFFFF", opacity: 0.8 }}
          >
            Découvrez comment vos connexions professionnelles peuvent créer des
            opportunités infinies, comme les liaisons du carbone dans la nature.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ backgroundColor: "#FFFFFF", color: "#09090B" }}
            >
              Explorer le Réseau
            </button>
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 font-bold rounded-full hover:scale-105 transition-all duration-300"
              style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
            >
              En Savoir Plus
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer
        className="relative py-12 sm:py-16 px-4 border-t z-10"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <VideoText
            text="CARBONE"
            videoSrc="/carboneTexte.mp4"
            className="text-2xl sm:text-3xl font-black font-hk-grotesk mb-4"
          />
          <p
            className="mb-6 sm:mb-8"
            style={{ color: "#FFFFFF", opacity: 0.6 }}
          >
            L'élément qui unit tout • Créateur de liaisons durables
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base"
            style={{ color: "#FFFFFF" }}
          >
            <span>🧪 Chimie</span>
            <span>🤝 Réseau</span>
            <span>🚀 Innovation</span>
            <span>💎 Excellence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
