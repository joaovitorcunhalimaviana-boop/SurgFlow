'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Phone, Mail, Eye, EyeOff, Check, Star, Users, BookOpen, Calendar, Shield, Lock, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/ui/logo';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

const SignUpPage: React.FC = () => {
  const { register } = useAuth();
  const { showError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribeNewsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Verificar parâmetros da URL
  useEffect(() => {
    const plan = searchParams.get('plano');
    const redirect = searchParams.get('redirect');
    
    if (plan) {
      setSelectedPlan(plan);
    }
    
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  // Função para formatar WhatsApp
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  };

  // Função para formatar data de nascimento
  const formatBirthDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    return value;
  };

  // Função para validar força da senha
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Muito fraca', color: 'text-red-500' };
      case 2: return { text: 'Fraca', color: 'text-orange-500' };
      case 3: return { text: 'Média', color: 'text-yellow-500' };
      case 4: return { text: 'Forte', color: 'text-green-500' };
      case 5: return { text: 'Muito forte', color: 'text-green-600' };
      default: return { text: '', color: '' };
    }
  };

  const handleInputChange = (field: string, value: any) => {
    // Real-time formatting
    let formattedValue = value;
    if (field === 'whatsapp') {
      formattedValue = formatWhatsApp(value);
    } else if (field === 'birthDate') {
      formattedValue = formatBirthDate(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Real-time validation
    const newErrors = { ...errors };
    
    // Clear previous error for this field
    delete newErrors[field];
    
    // Validate specific fields
    switch (field) {
      case 'fullName':
        if (value.trim().length > 0 && value.trim().length < 3) {
          newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres';
        } else if (value.trim().length > 0 && !/^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim())) {
          newErrors.fullName = 'Nome deve conter apenas letras';
        }
        break;
        
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Digite um email válido';
        }
        break;
        
      case 'whatsapp':
        if (value && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formattedValue)) {
          newErrors.whatsapp = 'Digite um telefone válido';
        }
        break;
        
      case 'birthDate':
        if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(formattedValue)) {
          newErrors.birthDate = '❌ Digite uma data de nascimento válida';
        } else if (formattedValue.length === 10) {
          const [day, month, year] = formattedValue.split('/').map(Number);
          const birthDate = new Date(year, month - 1, day);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (isNaN(birthDate.getTime()) || day > 31 || month > 12 || year < 1900) {
            newErrors.birthDate = '❌ Digite uma data de nascimento válida';
          } else if (birthDate > today) {
            newErrors.birthDate = '❌ Data não pode ser no futuro';
          } else if (age < 18) {
            newErrors.birthDate = '❌ Você precisa ter 18 anos ou mais para se cadastrar';
          }
        }
        break;
        
      case 'password':
        if (value && value.length < 8) {
          newErrors.password = '❌ Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número';
        } else if (value && (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value))) {
          newErrors.password = '❌ Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número';
        }
        
        // Check confirm password if it exists
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = '❌ As senhas não coincidem';
        } else if (formData.confirmPassword && value === formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'confirmPassword':
        if (value && value !== formData.password) {
          newErrors.confirmPassword = '❌ As senhas não coincidem';
        }
        break;
        
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = 'Você precisa aceitar os termos para continuar';
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validação do nome completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = 'Nome deve conter apenas letras';
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Digite um email válido';
    }

    // Validação do telefone
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Digite um telefone válido';
    }

    // Validação da data de nascimento
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.birthDate)) {
      newErrors.birthDate = '❌ Digite uma data de nascimento válida';
    } else {
      const [day, month, year] = formData.birthDate.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (isNaN(birthDate.getTime()) || day > 31 || month > 12 || year < 1900) {
        newErrors.birthDate = '❌ Digite uma data de nascimento válida';
      } else if (birthDate > today) {
        newErrors.birthDate = '❌ Data não pode ser no futuro';
      } else if (age < 18) {
        newErrors.birthDate = '❌ Você precisa ter 18 anos ou mais para se cadastrar';
      }
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (formData.password.length < 8) {
      newErrors.password = '❌ Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número';
    } else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = '❌ Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número';
    }

    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '❌ Por favor, preencha todos os campos obrigatórios';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '❌ As senhas não coincidem';
    }

    // Validação dos termos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você precisa aceitar os termos para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await register({
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        password: formData.password,
        plan: selectedPlan || 'teste'
      });
      
      if (success) {
        // Determinar para onde redirecionar após o cadastro
        if (selectedPlan && selectedPlan !== 'teste') {
          // Se veio de um plano pago, redirecionar para checkout
          router.push(`/checkout?plan=${selectedPlan}`);
        } else if (redirectUrl) {
          // Se tem URL de redirecionamento, ir para lá
          router.push(redirectUrl);
        } else {
          // Caso padrão, ir para home
          router.push('/');
        }
      } else {
        setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };



  const isFormValid = (): boolean => {
    return (
      formData.fullName.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.whatsapp) &&
      /^\d{2}\/\d{2}\/\d{4}$/.test(formData.birthDate) &&
      formData.password.length >= 8 &&
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      formData.acceptTerms
    );
  };

  const benefits = [
    { icon: Users, text: 'Acesso ao grupo VIP WhatsApp "Hobby Cirúrgico"' },
    { icon: BookOpen, text: 'Aulas exclusivas com especialistas' },
    { icon: Star, text: 'Conteúdo premium e evidências científicas' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Junte-se à Comunidade
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crie sua Conta no
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                SurgFlow
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cadastre-se gratuitamente e tenha acesso aos melhores recursos para sua prática cirúrgica
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Por que se cadastrar?
                </h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">{benefit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "O SurgFlow revolucionou minha forma de estudar e praticar cirurgia. 
                    O acesso rápido às evidências e o networking com outros profissionais 
                    tem sido fundamental para meu crescimento."
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">Dra. Maria Santos</p>
                    <p className="text-gray-600 text-sm">Cirurgiã Geral - Hospital das Clínicas</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="border-purple-200 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Criar Conta</CardTitle>
                <p className="text-gray-600">Preencha seus dados para começar</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.fullName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="seu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                      Telefone/WhatsApp *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.whatsapp ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Usaremos apenas para comunicações importantes
                    </p>
                    {errors.whatsapp && (
                      <p className="text-sm text-red-600">{errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Birth Date */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                        Data de Nascimento *
                      </label>
                      <div className="relative ml-2 group">
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          Usamos para entender melhor nosso público
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="birthDate"
                        type="text"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.birthDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="DD/MM/AAAA"
                        maxLength={10}
                      />
                    </div>
                    {errors.birthDate && (
                      <p className="text-sm text-red-600">{errors.birthDate}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Senha *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Crie uma senha segura"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Use no mínimo 8 caracteres com letras maiúsculas, minúsculas e números
                    </p>
                    {/* Password strength indicator */}
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded ${
                                getPasswordStrength(formData.password) >= level
                                  ? getPasswordStrength(formData.password) === 1
                                    ? 'bg-red-400'
                                    : getPasswordStrength(formData.password) === 2
                                    ? 'bg-yellow-400'
                                    : getPasswordStrength(formData.password) === 3
                                    ? 'bg-blue-400'
                                    : 'bg-green-400'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs ${
                          getPasswordStrength(formData.password) === 1
                            ? 'text-red-600'
                            : getPasswordStrength(formData.password) === 2
                            ? 'text-yellow-600'
                            : getPasswordStrength(formData.password) === 3
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`}>
                          {getPasswordStrength(formData.password) === 1 && 'Senha fraca'}
                          {getPasswordStrength(formData.password) === 2 && 'Senha regular'}
                          {getPasswordStrength(formData.password) === 3 && 'Senha boa'}
                          {getPasswordStrength(formData.password) === 4 && 'Senha forte'}
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirmar Senha *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Digite a senha novamente"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        id="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                        Li e aceito os <a href="/termos" className="text-purple-600 hover:text-purple-700">Termos de Uso</a> e 
                        <a href="/privacidade" className="text-purple-600 hover:text-purple-700 ml-1">Política de Privacidade</a> *
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                    )}
                  </div>

                  {/* General Error */}
                  {errors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !isFormValid()}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Criando conta...
                      </div>
                    ) : (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Criar Conta
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Já tem conta?{' '}
                    <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                      Faça login
                    </a>
                  </p>
                </div>

                {/* Plan upgrade section */}
                {!selectedPlan || selectedPlan === 'teste' ? (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Quer Acesso Completo?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Desbloqueie todos os guideflows, calculadoras e junte-se à comunidade MindFlow com especialistas
                    </p>
                    <Button
                      onClick={() => router.push('/planos')}
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Ver Planos Pagos
                    </Button>
                  </div>
                ) : (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Você escolheu: {selectedPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      Após criar sua conta, você será direcionado para finalizar sua assinatura.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;