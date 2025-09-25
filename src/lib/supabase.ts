import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://reduzvmuwxwpdcjsbjob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZHV6dm11d3h3cGRjanNiam9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODc4MzcsImV4cCI6MjA3NDA2MzgzN30.fZi_hoHkiuIUXbifxloDKr3sAq-AlbI5WMS1VJhVeH0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          role: 'super_admin' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          password_hash: string;
          role?: 'super_admin' | 'admin';
        };
        Update: {
          email?: string;
          password_hash?: string;
          role?: 'super_admin' | 'admin';
        };
      };
      hero_content: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          background_image: string | null;
          cta_text: string;
          cta_link: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          subtitle?: string;
          background_image?: string;
          cta_text?: string;
          cta_link?: string;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          subtitle?: string;
          background_image?: string;
          cta_text?: string;
          cta_link?: string;
          is_active?: boolean;
        };
      };
      activities: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          features: any;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string;
          image_url?: string;
          features?: any;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          name?: string;
          description?: string;
          image_url?: string;
          features?: any;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          content: string;
          rating: number;
          location: string | null;
          avatar_url: string | null;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          content: string;
          rating: number;
          location?: string;
          avatar_url?: string;
          is_featured?: boolean;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          content?: string;
          rating?: number;
          location?: string;
          avatar_url?: string;
          is_featured?: boolean;
          is_active?: boolean;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'unread' | 'read' | 'replied';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string;
          subject?: string;
          message: string;
          status?: 'unread' | 'read' | 'replied';
          admin_notes?: string;
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string;
          subject?: string;
          message?: string;
          status?: 'unread' | 'read' | 'replied';
          admin_notes?: string;
        };
      };
    };
  };
};