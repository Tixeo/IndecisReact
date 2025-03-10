import { NextResponse } from "next/server"
import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY_ADMIN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID!)

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID de l\'article manquant' }, { status: 400 })
    }

    await base('Articles').destroy(id)

    return NextResponse.json({ 
      success: true, 
      message: 'Article supprimé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'article' }, { status: 500 })
  }
} 