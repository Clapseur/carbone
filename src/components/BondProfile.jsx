import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const BondProfile = () => {
  const { bondId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [bondId]);

  const fetchProfile = async () => {
    try {
      const { data: bondData, error: bondError } = await supabase
        .from('bond_ids')
        .select(`
          *,
          profiles (*)
        `)
        .eq('bond_id', bondId)
        .eq('is_active', true)
        .single();

      if (bondError) throw bondError;
      
      if (!bondData) {
        setError('Profil non trouvé');
        return;
      }

      setProfile(bondData.profiles);
    } catch (err) {
      setError('Erreur lors du chargement du profil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Profil non trouvé</h1>
          <p className="text-gray-300 mb-6">Ce lien Carbone n'existe pas ou a expiré.</p>
          <a 
            href="https://bond.carbonedev.com" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto sm:max-w-lg lg:max-w-2xl">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold">
                {profile.prenom?.[0]}{profile.nom?.[0]}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {profile.prenom} {profile.nom}
            </h1>
            {profile.entreprise && (
              <p className="text-lg text-blue-300">{profile.entreprise}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400">✉</span>
              </div>
              <a href={`mailto:${profile.email}`} className="text-gray-300 hover:text-white transition-colors">
                {profile.email}
              </a>
            </div>
            
            {profile.telephone && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">📞</span>
                </div>
                <a href={`tel:${profile.telephone}`} className="text-gray-300 hover:text-white transition-colors">
                  {profile.telephone}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              Profil Carbone • Créé le {new Date(profile.created_at).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondProfile;