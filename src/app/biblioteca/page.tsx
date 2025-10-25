'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import IntelligentSearch from '@/components/search/IntelligentSearch'
import { SearchDataItem } from '@/data/searchData'
import {
  BookOpen,
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  Users,
  Star,
  ExternalLink,
  Sparkles
} from 'lucide-react'

interface Guideline {
  id: string
  title: string
  description: string
  category: string
  year: string
  authors: string
  fileName: string
  featured: boolean
}

export default function BibliotecaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [intelligentSearchActive, setIntelligentSearchActive] = useState(false)

  // Função para lidar com seleção de resultado da busca inteligente
  const handleIntelligentSearchResult = (result: SearchDataItem) => {
    setSearchTerm(result.guideline)
    setIntelligentSearchActive(false)
    // Aqui você pode adicionar lógica para navegar para o guideline específico
    console.log('Guideline selecionado:', result)
  }

  const guidelines: Guideline[] = [
    {
      id: 'tokyo-antimicrobial',
      title: 'Tokyo Guidelines 2018: Antimicrobial Therapy for Acute Cholangitis',
      description: 'Diretrizes para terapia antimicrobiana em colangite aguda baseadas nas Tokyo Guidelines 2018.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Gomi et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Gomi - Tokyo Guidelines 2018  antimicrobial therapy for acute cholangitis and.pdf',
      featured: true
    },
    {
      id: 'tokyo-diagnostic-criteria',
      title: 'Tokyo Guidelines 2018: Diagnostic Criteria and Severity Grading',
      description: 'Critérios diagnósticos e graduação de gravidade para colangite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Kiriyama et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Kiriyama - Tokyo Guidelines 2018  diagnostic criteria and severity grading of acute.pdf',
      featured: true
    },
    {
      id: 'tokyo-management-bundles',
      title: 'Tokyo Guidelines 2018: Management Bundles',
      description: 'Pacotes de manejo para colangite aguda e colecistite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Mayumi et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Mayumi - Tokyo Guidelines 2018  management bundles for acute cholangitis and.pdf',
      featured: false
    },
    {
      id: 'tokyo-initial-management',
      title: 'Tokyo Guidelines 2018: Initial Management of Acute Biliary Infection',
      description: 'Manejo inicial da infecção biliar aguda e síndrome de Mirizzi.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Miura et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Miura - Tokyo Guidelines 2018  initial management of acute biliary infection and.pdf',
      featured: false
    },
    {
      id: 'tokyo-gallbladder-drainage',
      title: 'Tokyo Guidelines 2018: Gallbladder Drainage Management',
      description: 'Estratégias de manejo para drenagem da vesícula biliar em pacientes com colecistite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Mori et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Mori - Tokyo Guidelines 2018  management strategies for gallbladder drainage in patients.pdf',
      featured: false
    },
    {
      id: 'tokyo-biliary-drainage',
      title: 'Tokyo Guidelines 2018: Biliary Drainage Techniques',
      description: 'Indicações e técnicas de drenagem biliar para colangite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Mukai et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Mukai - Indications and techniques of biliary drainage for acute cholangitis in updated.pdf',
      featured: false
    },
    {
      id: 'tokyo-cholecystitis-flowchart',
      title: 'Tokyo Guidelines 2018: Flowchart for Acute Cholecystitis Management',
      description: 'Fluxograma para o manejo da colecistite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Okamoto et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Okamoto - Tokyo Guidelines 2018  flowchart for the management of acute cholecystitis.pdf',
      featured: true
    },
    {
      id: 'tokyo-surgical-management',
      title: 'Tokyo Guidelines 2018: Surgical Management of Acute Cholecystitis',
      description: 'Manejo cirúrgico seguro da colecistite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Wakabayashi et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Wakabayashi - Tokyo Guidelines 2018  surgical management of acute cholecystitis  safe.pdf',
      featured: false
    },
    {
      id: 'tokyo-diagnostic-severity',
      title: 'Tokyo Guidelines 2018: Diagnostic Criteria and Severity Grading of Acute Cholecystitis',
      description: 'Critérios diagnósticos e graduação de gravidade da colecistite aguda.',
      category: 'Cirurgia Hepatobiliar',
      year: '2017',
      authors: 'Yokoe et al.',
      fileName: 'J Hepato Biliary Pancreat - 2017 - Yokoe - Tokyo Guidelines 2018  diagnostic criteria and severity grading of acute.pdf',
      featured: false
    },
    {
      id: 'jerusalem-appendicitis',
      title: 'Jerusalem Guidelines: Appendicitis',
      description: 'Diretrizes de Jerusalem para diagnóstico e manejo da apendicite.',
      category: 'Cirurgia Geral',
      year: '2020',
      authors: 'Jerusalem Guidelines Committee',
      fileName: 'Jerusalem Guidelines - Appendicitis.pdf',
      featured: true
    },
    {
      id: 'weses-diverticulitis-elderly',
      title: 'WESES Guidelines: Diverticulitis in Elderly',
      description: 'Diretrizes WESES para manejo da diverticulite em pacientes idosos.',
      category: 'Cirurgia Colorretal',
      year: '2019',
      authors: 'WESES Committee',
      fileName: 'WESES - Diverticulitis Elderly.pdf',
      featured: false
    },
    {
      id: 'wses-diverticulitis',
      title: 'WSES Guidelines: Diverticulitis',
      description: 'Diretrizes WSES para diagnóstico e manejo da diverticulite.',
      category: 'Cirurgia Colorretal',
      year: '2020',
      authors: 'WSES Committee',
      fileName: 'WSES - Diverticulitis.pdf',
      featured: false
    }
  ]

  const categories = ['Todas', 'Cirurgia Hepatobiliar', 'Cirurgia Geral', 'Cirurgia Colorretal']

  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.authors.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || guideline.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredGuidelines = guidelines.filter(g => g.featured)

  const handleDownload = (fileName: string, title: string) => {
    // Criar um link temporário para download
    const link = document.createElement('a')
    link.href = `/Guidelines/${fileName}`
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-25 py-20 lg:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-purple-600" />
              </motion.div>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-1 text-sm">
                +{guidelines.length} Guidelines Disponíveis
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Biblioteca
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Virtual
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Acesse e baixe guidelines médicos essenciais para sua prática clínica.
              Documentos atualizados e baseados em evidências científicas.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Busca Inteligente */}
            <div className="flex-1 max-w-2xl">
              <div className="flex gap-2 mb-2">
                <Button
                  variant={intelligentSearchActive ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIntelligentSearchActive(!intelligentSearchActive)}
                  className={intelligentSearchActive ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Busca Inteligente
                </Button>
                <Button
                  variant={!intelligentSearchActive ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIntelligentSearchActive(false)}
                  className={!intelligentSearchActive ? "bg-gray-600 hover:bg-gray-700 text-white" : ""}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Busca Simples
                </Button>
              </div>
              
              {intelligentSearchActive ? (
                <IntelligentSearch
                  onResultSelect={handleIntelligentSearchResult}
                  placeholder="Buscar por sintomas (ex: dor abdominal), keywords (ex: murphy) ou guidelines..."
                  className="w-full"
                />
              ) : (
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar guidelines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Dica de uso da busca inteligente */}
          {intelligentSearchActive && (
            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>💡 Dica:</strong> Use a busca inteligente para encontrar guidelines por sintomas 
                (ex: "dor abdominal", "febre") ou keywords médicas (ex: "murphy", "blumberg", "tokyo").
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Guidelines */}
      {featuredGuidelines.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
                Guidelines em Destaque
              </h2>
              <Badge className="bg-purple-100 text-purple-800">
                <Star className="w-4 h-4 mr-1" />
                Recomendados
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuidelines.map((guideline, index) => (
                <motion.div
                  key={guideline.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-[420px] flex flex-col hover:shadow-2xl transition-shadow duration-300 border-purple-200 overflow-hidden group relative">
                      {/* Animated gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardHeader className="pb-3 relative flex-shrink-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors"
                              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <BookOpen className="w-5 h-5 text-purple-600" />
                            </motion.div>
                            <Badge variant="secondary" className="text-xs">
                              {guideline.category}
                            </Badge>
                          </div>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          </motion.div>
                        </div>
                        <CardTitle className="text-lg leading-tight mt-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {guideline.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative flex flex-col flex-1">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                          {guideline.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 flex-shrink-0">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {guideline.authors}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {guideline.year}
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0">
                          <Button
                            onClick={() => handleDownload(guideline.fileName, guideline.title)}
                            className="w-full bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Guidelines */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <div className="w-1 h-8 bg-gray-600 rounded-full mr-4"></div>
              Todos os Guidelines
            </h2>
            <div className="text-sm text-gray-600">
              {filteredGuidelines.length} de {guidelines.length} guidelines
            </div>
          </div>

          {filteredGuidelines.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum guideline encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou termos de busca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuidelines.map((guideline, index) => (
                <motion.div
                  key={guideline.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="h-[420px] hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col">
                      {/* Hover gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/0 via-gray-500/5 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardHeader className="pb-3 relative flex-shrink-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors"
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <FileText className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                            </motion.div>
                            <Badge variant="outline" className="text-xs group-hover:border-purple-300 transition-colors">
                              {guideline.category}
                            </Badge>
                          </div>
                          {guideline.featured && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            </motion.div>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight mt-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {guideline.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative flex-1 flex flex-col">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                          {guideline.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 flex-shrink-0">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {guideline.authors}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {guideline.year}
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0">
                          <Button
                            onClick={() => handleDownload(guideline.fileName, guideline.title)}
                            variant="outline"
                            className="w-full hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm hover:shadow-md"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}