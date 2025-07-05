import { supabase } from '../config/supabase';
import type { User } from '../types';

export const authService = {
  async signUp(email: string, password: string, userData: Partial<User>) {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (authError) throw authError;
    
    // If sign up was successful and we have a user, create their profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: userData.full_name,
          role: userData.role,
          institution: userData.institution
        });
      
      if (profileError) throw profileError;
    }
    
    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user) return null;
      
      // Get additional user data from our users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (userError) throw userError;
      return userData;
    } catch (error) {
      // Handle the specific "Auth session missing!" error gracefully
      if (error instanceof Error && error.message === 'Auth session missing!') {
        return null;
      }
      // Re-throw any other errors
      throw error;
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};