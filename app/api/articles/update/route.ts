import { NextResponse } from "next/server"
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY_ADMIN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!)

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, content, category, tag, image_url, indice } = body

    if (!id || !title || !description || !content || !category || !image_url) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 })
    }

    const updatedRecord = await base('Articles').update(id, {
      title,
      description,
      content,
      category,
      tag,
      image_url,
      indice: indice || 0,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Article mis à jour avec succès',
      article: {
        id: updatedRecord.id,
        title,
        description,
        content,
        category,
        tag,
        image_url,
        indice: indice || 0,
        numeric_id: updatedRecord.get('ID') as number
      }
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l\'article' }, { status: 500 })
  }
} 