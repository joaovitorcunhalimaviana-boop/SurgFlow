'use client'

import React, { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Download, 
  FileText, 
  Search,
  Filter,
  Calendar,
  Users,
  Star,
  ExternalLink
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-25 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Biblioteca
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Virtual
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Acesse e baixe guidelines médicos essenciais para sua prática clínica. 
            Documentos atualizados e baseados em evidências científicas.
          </p>
        </div>
      </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar guidelines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
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
              {featuredGuidelines.map((guideline) => (
                <Card key={guideline.id} className="hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {guideline.category}
                        </Badge>
                      </div>
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                    <CardTitle className="text-lg leading-tight mt-3">
                      {guideline.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {guideline.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {guideline.authors}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {guideline.year}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleDownload(guideline.fileName, guideline.title)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </CardContent>
                </Card>
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
              {filteredGuidelines.map((guideline) => (
                <Card key={guideline.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {guideline.category}
                        </Badge>
                      </div>
                      {guideline.featured && (
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight mt-3">
                      {guideline.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {guideline.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {guideline.authors}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {guideline.year}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleDownload(guideline.fileName, guideline.title)}
                      variant="outline"
                      className="w-full hover:bg-purple-50 hover:border-purple-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}