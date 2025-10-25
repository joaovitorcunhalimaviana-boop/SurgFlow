'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PremiumFeatureWrapper from '@/components/features/PremiumFeatureWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calculator,
  Heart,
  Activity,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  Search,
  Filter,
  Sparkles
} from 'lucide-react'

interface Calculadora {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any>
  requiredPlan: 'guideflow' | 'mindflow' | null
  color: string
}

export default function CalculadorasPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  
  const calculadoras: Calculadora[] = [
    {
      id: 'alvarado',
      name: 'Escore de Alvarado',
      description: 'Avaliação diagnóstica para apendicite aguda',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'aas',
      name: 'AAS - Adult Appendicitis Score',
      description: 'Score de apendicite para adultos com dados laboratoriais',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'air',
      name: 'AIR - Appendicitis Inflammatory Response',
      description: 'Score de resposta inflamatória na apendicite',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'tokyo-criteria',
      name: 'Critérios de Tokyo',
      description: 'Diagnóstico e gravidade da colecistite aguda',
      category: 'Cirurgia Geral',
      icon: Stethoscope,
      requiredPlan: null, // Gratuita
      color: 'blue'
    },
    {
      id: 'apache-ii',
      name: 'APACHE II',
      description: 'Avaliação de gravidade em UTI',
      category: 'Medicina Intensiva',
      icon: Activity,
      requiredPlan: 'guideflow',
      color: 'red'
    },
    {
      id: 'ranson',
      name: 'Critérios de Ranson',
      description: 'Prognóstico da pancreatite aguda',
      category: 'Gastroenterologia',
      icon: AlertTriangle,
      requiredPlan: 'guideflow',
      color: 'orange'
    },
    {
      id: 'asa-score',
      name: 'Classificação ASA',
      description: 'Avaliação do estado físico pré-operatório',
      category: 'Anestesiologia',
      icon: Stethoscope,
      requiredPlan: 'guideflow',
      color: 'blue'
    },
    {
      id: 'bmi-calculator',
      name: 'IMC e Superfície Corporal',
      description: 'Cálculo de IMC, superfície corporal e peso ideal',
      category: 'Medicina Geral',
      icon: Calculator,
      requiredPlan: 'guideflow',
      color: 'green'
    },
    {
      id: 'sofa',
      name: 'SOFA Score',
      description: 'Avaliação de disfunção orgânica sequencial',
      category: 'Medicina Intensiva',
      icon: Heart,
      requiredPlan: 'guideflow',
      color: 'purple'
    },
    {
      id: 'bisap',
      name: 'BISAP Score',
      description: 'Predição de mortalidade na pancreatite',
      category: 'Gastroenterologia',
      icon: TrendingUp,
      requiredPlan: 'mindflow',
      color: 'indigo'
    },
    {
      id: 'glasgow-coma',
      name: 'Escala de Glasgow',
      description: 'Avaliação do nível de consciência',
      category: 'Neurologia',
      icon: Target,
      requiredPlan: 'guideflow',
      color: 'teal'
    },
    {
      id: 'iss',
      name: 'Injury Severity Score',
      description: 'Gravidade de trauma múltiplo',
      category: 'Trauma',
      icon: Clock,
      requiredPlan: 'mindflow',
      color: 'pink'
    }
  ]

  const categorias = ['Todas', ...new Set(calculadoras.map(calc => calc.category))]

  // Filtrar calculadoras baseado na busca e categoria
  const calculadorasFiltradas = calculadoras.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || calc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categoriasFiltradas = selectedCategory === 'Todas' 
    ? [...new Set(calculadorasFiltradas.map(calc => calc.category))]
    : [selectedCategory]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200'
    }
    return colors[color] || colors.blue
  }

  const renderCalculadora = (calc: Calculadora) => {
    const IconComponent = calc.icon
    const content = (
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-lg ${getColorClasses(calc.color).replace('text-', 'text-').replace('border-', 'bg-').replace('bg-', 'bg-').split(' ')[0]}`}>
              <IconComponent className={`h-6 w-6 ${getColorClasses(calc.color).split(' ')[1]}`} />
            </div>
            {calc.requiredPlan && (
              <Badge className={`${getColorClasses(calc.color)} text-xs`}>
                {calc.requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-gray-900">{calc.name}</CardTitle>
          <p className="text-sm text-gray-600">{calc.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {calc.category}
            </Badge>
            <Link href={`/calculadoras/${calc.id}`}>
              <Button
                size="sm"
                className="text-xs"
              >
                Calcular
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )

    if (calc.requiredPlan) {
      return (
        <PremiumFeatureWrapper
          key={calc.id}
          requiredPlan={calc.requiredPlan as 'guideflow' | 'mindflow'}
          featureName={`a calculadora ${calc.name}`}
          className="h-full"
        >
          {content}
        </PremiumFeatureWrapper>
      )
    }

    return <div key={calc.id} className="h-full">{content}</div>
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="relative text-center mb-12 overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
              className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -30, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Ferramentas de Cálculo
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Calculadoras
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                  Médicas
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Ferramentas precisas para tomada de decisão clínica baseada em evidências científicas
              </motion.p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: `${calculadoras.length}+`, label: 'Calculadoras', color: 'purple-600', delay: 0 },
              { value: calculadoras.filter(c => !c.requiredPlan).length, label: 'Gratuitas', color: 'purple-700', delay: 0.1 },
              { value: [...new Set(calculadoras.map(c => c.category))].length, label: 'Especialidades', color: 'purple-500', delay: 0.2 },
              { value: '100%', label: 'Baseadas em Evidências', color: 'purple-800', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center cursor-default hover:border-purple-200 transition-colors"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: stat.delay + 0.2 }}
                  className={`text-3xl font-bold text-${stat.color} mb-2`}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Busca e Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1 relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar calculadoras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-64"
              >
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 text-sm text-gray-600"
              >
                Mostrando {calculadorasFiltradas.length} resultado(s) para "{searchTerm}"
              </motion.div>
            )}
          </motion.div>

          {/* Calculadoras por Categoria */}
          {calculadorasFiltradas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma calculadora encontrada</h3>
              <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
            </motion.div>
          ) : (
            categoriasFiltradas.map((categoria, catIndex) => (
              <motion.div
                key={categoria}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-1 h-8 bg-purple-600 rounded-full mr-4 origin-top"
                  />
                  {categoria}
                  <Badge variant="outline" className="ml-3 text-xs">
                    {calculadorasFiltradas.filter(calc => calc.category === categoria).length}
                  </Badge>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {calculadorasFiltradas
                    .filter(calc => calc.category === categoria)
                    .map((calc, index) => (
                      <motion.div
                        key={calc.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="h-full"
                      >
                        {renderCalculadora(calc)}
                      </motion.div>
                    ))
                  }
                </div>
              </motion.div>
            ))
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white mt-16 overflow-hidden"
          >
            {/* Background animation */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10 text-2xl font-bold mb-4"
            >
              Precisa de mais calculadoras?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-white mb-6 max-w-2xl mx-auto"
            >
              Upgrade para o GuideFlow ou MindFlow e tenha acesso a todas as calculadoras médicas e scores clínicos
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => router.push('/planos')}
                >
                  Ver Planos
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  onClick={() => router.push('/contato')}
                >
                  Solicitar Calculadora
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}