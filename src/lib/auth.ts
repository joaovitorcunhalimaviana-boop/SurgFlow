import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from './supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthUser {
  id: string
  fullName: string
  email: string
  whatsapp: string
  plan: 'teste' | 'guideflow' | 'mindflow' | 'admin'
  role?: 'user' | 'admin' | 'super_admin'
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  whatsapp: string
  birthDate: string
  password: string
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export const generateToken = (user: AuthUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role || 'user'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Register user
export const registerUser = async (userData: RegisterData): Promise<{ user: AuthUser; token: string }> => {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', userData.email)
      .single()

    if (existingUser) {
      throw new Error('E-mail já está em uso')
    }

    // Hash password
    const passwordHash = await hashPassword(userData.password)

    // Insert user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        full_name: userData.fullName,
        email: userData.email,
        whatsapp: userData.whatsapp,
        birth_date: userData.birthDate,
        password_hash: passwordHash,
        plan: 'teste'
      })
      .select('id, full_name, email, whatsapp, plan, role, is_active')
      .single()

    if (error) {
      throw new Error('Erro ao criar usuário: ' + error.message)
    }

    const authUser: AuthUser = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      role: user.role,
      isActive: user.is_active
    }

    // Create default subscription
    await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: (await supabase.from('plans').select('id').eq('slug', 'teste').single()).data?.id,
        status: 'active'
      })

    const token = generateToken(authUser)

    return { user: authUser, token }
  } catch (error) {
    throw error
  }
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> => {
  try {
    // Get user with password
    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, email, whatsapp, plan, role, is_active, password_hash')
      .eq('email', credentials.email)
      .single()

    if (error || !user) {
      throw new Error('E-mail ou senha incorretos')
    }

    // Verify password
    const isValidPassword = await verifyPassword(credentials.password, user.password_hash)
    if (!isValidPassword) {
      throw new Error('E-mail ou senha incorretos')
    }

    if (!user.is_active) {
      throw new Error('Conta desativada. Entre em contato com o suporte.')
    }

    const authUser: AuthUser = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      role: user.role,
      isActive: user.is_active
    }

    const token = generateToken(authUser)

    return { user: authUser, token }
  } catch (error) {
    throw error
  }
}

// Update user plan
export const updateUserPlan = async (userId: string, newPlan: 'teste' | 'guideflow' | 'mindflow'): Promise<AuthUser> => {
  try {
    // Update user plan
    const { data: user, error } = await supabase
      .from('users')
      .update({ plan: newPlan })
      .eq('id', userId)
      .select('id, full_name, email, whatsapp, plan, is_active')
      .single()

    if (error) {
      throw new Error('Erro ao atualizar plano: ' + error.message)
    }

    // Update subscription
    const planData = await supabase
      .from('plans')
      .select('id')
      .eq('slug', newPlan)
      .single()

    if (planData.data) {
      await supabase
        .from('subscriptions')
        .update({
          plan_id: planData.data.id,
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('user_id', userId)
    }

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      isActive: user.is_active
    }
  } catch (error) {
    throw error
  }
}

// Get user by token
export const getUserByToken = async (token: string): Promise<AuthUser | null> => {
  try {
    const decoded = verifyToken(token)
    if (!decoded) return null

    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, email, whatsapp, plan, is_active')
      .eq('id', decoded.id)
      .single()

    if (error || !user) return null

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      isActive: user.is_active
    }
  } catch (error) {
    return null
  }
}