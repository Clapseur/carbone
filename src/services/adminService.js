import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.REACT_APP_SUPABASE_URL,
  import.meta.env.REACT_APP_SUPABASE_SERVICE_KEY // Use service key for admin operations
);

export class AdminService {
  // Generate multiple bond IDs
  static async generateBondIds(count = 100) {
    const bondIds = [];
    
    for (let i = 0; i < count; i++) {
      bondIds.push({
        bond_id: this.generateRandomId(),
        is_active: false,
        is_available: true,
        created_at: new Date().toISOString()
      });
    }

    const { data, error } = await supabase
      .from('bond_ids')
      .insert(bondIds)
      .select();

    if (error) throw error;
    return data;
  }

  // Get available bond IDs
  static async getAvailableBondIds(limit = 50) {
    const { data, error } = await supabase
      .from('bond_ids')
      .select('*')
      .eq('is_available', true)
      .eq('is_active', false)
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Activate a bond ID for a profile
  static async activateBondId(bondId, profileId) {
    const { data, error } = await supabase
      .from('bond_ids')
      .update({
        profile_id: profileId,
        is_active: true,
        is_available: false,
        activated_at: new Date().toISOString()
      })
      .eq('bond_id', bondId)
      .select();

    if (error) throw error;
    return data[0];
  }

  // Get all profiles with their bond IDs
  static async getAllProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        bond_ids (*)
      `);

    if (error) throw error;
    return data;
  }

  static generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}