import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = decodeURIComponent(params.filename)
    const filePath = path.join(process.cwd(), 'Guidelines', filename)
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Verificar se é um arquivo PDF
    if (!filename.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Ler o arquivo
    const fileBuffer = fs.readFileSync(filePath)
    
    // Retornar o arquivo com headers apropriados
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error downloading file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}