import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'mock-jwt-secret-for-development'

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
  email?: string
  username?: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  whatsapp: string
  birthDate: string
  password: string
}

// Mock users database
const mockUsers = [
  {
    id: '1',
    full_name: 'Administrador Master',
    email: 'admin@surgflow.com',
    whatsapp: '+5511999999999',
    birth_date: '1990-01-01',
    password_hash: '$2b$10$VcOggEOOTpf1pwH.aStqeOND3uHkSLg52KxKXPznokPDXQSiOOGSO', // admin123
    plan: 'admin',
    role: 'super_admin',
    is_active: true,
    email_verified: true
  },
  {
    id: '3',
    full_name: 'João Viana',
    email: 'joao@surgflow.com',
    username: 'joaoviana',
    whatsapp: '+5511777777777',
    birth_date: '1985-03-10',
    password_hash: '$2b$10$8ghYA3L2E/tmXsw.1JiqNOVfeupC3LKy36BOV23qFtAMtW8fLnEvG', // Logos1.1
    plan: 'admin',
    role: 'super_admin',
    is_active: true,
    email_verified: true
  },
  {
    id: '2',
    full_name: 'Usuário Teste',
    email: 'teste@surgflow.com',
    whatsapp: '+5511888888888',
    birth_date: '1995-05-15',
    password_hash: '$2b$10$VcOggEOOTpf1pwH.aStqeOND3uHkSLg52KxKXPznokPDXQSiOOGSO', // admin123
    plan: 'teste',
    role: 'user',
    is_active: true,
    email_verified: true
  }
]

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
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
    { expiresIn: '24h' }
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

// Register user (mock)
export const registerUser = async (userData: RegisterData): Promise<{ user: AuthUser; token: string }> => {
  try {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('E-mail já está em uso')
    }

    // Hash password
    const passwordHash = await hashPassword(userData.password)

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      full_name: userData.fullName,
      email: userData.email,
      whatsapp: userData.whatsapp,
      birth_date: userData.birthDate,
      password_hash: passwordHash,
      plan: 'teste' as const,
      role: 'user' as const,
      is_active: true,
      email_verified: true
    }

    mockUsers.push(newUser)

    const authUser: AuthUser = {
      id: newUser.id,
      fullName: newUser.full_name,
      email: newUser.email,
      whatsapp: newUser.whatsapp,
      plan: newUser.plan,
      role: newUser.role,
      isActive: newUser.is_active
    }

    const token = generateToken(authUser)

    return { user: authUser, token }
  } catch (error) {
    throw error
  }
}

// Login user (mock)
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> => {
  try {
    // Find user by email or username
    const user = mockUsers.find(u => 
      (credentials.email && u.email === credentials.email) ||
      (credentials.username && (u as any).username === credentials.username)
    )
    
    if (!user) {
      throw new Error('Credenciais incorretas')
    }

    // Verify password
    const isValidPassword = await verifyPassword(credentials.password, user.password_hash)
    if (!isValidPassword) {
      throw new Error('Credenciais incorretas')
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

// Update user plan (mock)
export const updateUserPlan = async (userId: string, newPlan: 'teste' | 'guideflow' | 'mindflow'): Promise<AuthUser> => {
  try {
    const user = mockUsers.find(u => u.id === userId)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    user.plan = newPlan

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      role: user.role,
      isActive: user.is_active
    }
  } catch (error) {
    throw error
  }
}

// Get user by token (mock)
export const getUserByToken = async (token: string): Promise<AuthUser | null> => {
  try {
    const decoded = verifyToken(token)
    if (!decoded) return null

    const user = mockUsers.find(u => u.id === decoded.id)
    if (!user) return null

    return {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      whatsapp: user.whatsapp,
      plan: user.plan,
      role: user.role,
      isActive: user.is_active
    }
  } catch (error) {
    return null
  }
}