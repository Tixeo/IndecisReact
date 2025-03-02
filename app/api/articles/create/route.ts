import { NextResponse } from "next/server"
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY_ADMIN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, content, category, tag, image_url, indice } = body

    if (!title || !description || !content || !category || !image_url) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 })
    }

    if (!['guides', 'tutoriels', 'templates', 'news'].includes(category)) {
      return NextResponse.json({ error: 'Catégorie invalide' }, { status: 400 })
    }

    if (indice && (isNaN(indice) || indice < 0)) {
      return NextResponse.json({ error: 'Indice invalide' }, { status: 400 })
    }

    let maxNumericId = 0
    try {
      const records = await base('Articles')
        .select({
          fields: ['ID'],
          sort: [{ field: 'ID', direction: 'desc' }],
          maxRecords: 1
        })
        .all()
      
      if (records.length > 0 && records[0].get('ID')) {
        maxNumericId = records[0].get('ID') as number
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du dernier ID:', error)
    }

    const newRecord = await base('Articles').create({
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
      message: 'Article créé avec succès',
      article: {
        id: newRecord.id,
        title,
        description,
        content,
        category,
        tag,
        image_url,
        indice: indice || 0,
      }
    })
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    return NextResponse.json({ error: 'Erreur lors de la création de l\'article' }, { status: 500 })
  }
} 