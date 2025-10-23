import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  full_name: string
  email: string
  whatsapp: string
  birth_date: string
  plan: 'teste' | 'guideflow' | 'mindflow'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Plan {
  id: string
  name: string
  slug: 'teste' | 'guideflow' | 'mindflow'
  price: number
  features: string[]
  is_active: boolean
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'inactive' | 'cancelled' | 'expired'
  started_at: string
  expires_at: string | null
  created_at: string
  updated_at: string
}