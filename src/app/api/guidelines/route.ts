import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const guidelinesPath = path.join(process.cwd(), 'Guidelines')
    
    // Verificar se a pasta existe
    if (!fs.existsSync(guidelinesPath)) {
      return NextResponse.json({ error: 'Guidelines folder not found' }, { status: 404 })
    }

    // Ler todos os arquivos da pasta
    const files = fs.readdirSync(guidelinesPath)
    
    // Filtrar apenas arquivos PDF
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'))
    
    // Mapear arquivos com informações adicionais
    const fileList = pdfFiles.map(file => {
      const filePath = path.join(guidelinesPath, file)
      const stats = fs.statSync(filePath)
      
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime,
        path: `/api/guidelines/download/${encodeURIComponent(file)}`
      }
    })

    return NextResponse.json({ files: fileList })
  } catch (error) {
    console.error('Error reading guidelines folder:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}