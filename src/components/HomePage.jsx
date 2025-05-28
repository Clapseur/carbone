import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import VideoText from './VideoText';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const HomePage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    hasNoCompany: false
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            telephone: formData.telephone,
            entreprise: formData.hasNoCompany ? null : formData.entreprise,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      // Generate unique bond ID
      const bondId = await generateBondId(data[0].id);
      
      // Redirect to bond page
      window.location.href = `https://bond.carbonedev.com/${bondId}`;
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateBondId = async (profileId) => {
    const { data, error } = await supabase
      .from('bond_ids')
      .insert([
        {
          profile_id: profileId,
          bond_id: generateRandomId(),
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return data[0].bond_id;
  };

  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <div className="min-h-screen text-white pt-16 px-4 sm:px-6 lg:px-8" style={{background: `linear-gradient(135deg, #222831 0%, #393E46 50%, #29A19C 100%)`}}>
      <div className="max-w-md mx-auto sm:max-w-lg lg:max-w-2xl">
        {/* Titre principal - Mobile First */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-hk-grotesk mb-4 sm:mb-6">
            <span className="block sm:inline bg-gradient-to-r from-white via-green-200 to-green-100 bg-clip-text text-transparent" style={{backgroundImage: `linear-gradient(to right, #ffffff, #A3F7BF, #29A19C)`}}>
              Bienvenue sur{' '}
            </span>
            <VideoText 
              text="Carbone" 
              videoSrc="/carboneTexte.mp4"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-hk-grotesk"
            />
          </h1>
          <p ref={subtitleRef} className="text-base sm:text-lg lg:text-xl font-light leading-relaxed px-2" style={{color: '#A3F7BF'}}>
            Créez des liaisons professionnelles comme l'élément chimique qui unit tout.
          </p>
        </div>

        {/* Formulaire d'inscription - Mobile Optimized */}
        <div ref={formRef} className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border" style={{background: 'rgba(163, 247, 191, 0.05)', borderColor: 'rgba(163, 247, 191, 0.2)'}}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Créer votre profil</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Nom et Prénom - Stack on mobile */}
            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 text-base"
                  style={{
                    backgroundColor: 'rgba(57, 62, 70, 0.3)',
                    borderColor: 'rgba(41, 161, 156, 0.3)',
                    '--tw-ring-color': '#29A19C'
                  }}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 text-base"
                  style={{
                    backgroundColor: 'rgba(57, 62, 70, 0.3)',
                    borderColor: 'rgba(41, 161, 156, 0.3)',
                    '--tw-ring-color': '#29A19C'
                  }}
                  placeholder="Votre prénom"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 text-base"
                style={{
                  backgroundColor: 'rgba(57, 62, 70, 0.3)',
                  borderColor: 'rgba(41, 161, 156, 0.3)',
                  '--tw-ring-color': '#29A19C'
                }}
                placeholder="votre@email.com"
                required
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 text-base"
                style={{
                  backgroundColor: 'rgba(57, 62, 70, 0.3)',
                  borderColor: 'rgba(41, 161, 156, 0.3)',
                  '--tw-ring-color': '#29A19C'
                }}
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-sm font-medium mb-2">Entreprise</label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleInputChange}
                disabled={formData.hasNoCompany}
                className="w-full px-3 sm:px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 disabled:opacity-50 text-base"
                style={{
                  backgroundColor: 'rgba(57, 62, 70, 0.3)',
                  borderColor: 'rgba(41, 161, 156, 0.3)',
                  '--tw-ring-color': '#29A19C'
                }}
                placeholder="Nom de votre entreprise"
              />
              <label className="flex items-center mt-2 text-sm" style={{color: '#A3F7BF'}}>
                <input
                  type="checkbox"
                  name="hasNoCompany"
                  checked={formData.hasNoCompany}
                  onChange={handleInputChange}
                  className="mr-2 rounded"
                  style={{accentColor: '#29A19C'}}
                />
                Je n'ai pas d'entreprise
              </label>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 text-base sm:text-lg"
              style={{
                background: `linear-gradient(135deg, #29A19C 0%, #A3F7BF 100%)`,
                color: '#222831',
                '--tw-ring-color': '#29A19C'
              }}
            >
              {isSubmitting ? 'Création en cours...' : 'Créer mon profil Carbone'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;