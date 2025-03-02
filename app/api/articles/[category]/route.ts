import { NextRequest, NextResponse } from 'next/server';
import { getArticlesByCategory } from '@/lib/airtable';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  
  if (!category || !['guides', 'tutoriels', 'templates', 'news'].includes(category)) {
    return NextResponse.json(
      { error: 'Catégorie invalide' },
      { status: 400 }
    );
  }

  try {
    const articles = await getArticlesByCategory(category as 'guides' | 'tutoriels' | 'templates');
    return NextResponse.json({ articles });
  } catch (error) {
    console.error(`Erreur lors de la récupération des articles de catégorie ${category}:`, error);
    return NextResponse.json(
      { error: `Erreur lors de la récupération des articles de catégorie ${category}` },
      { status: 500 }
    );
  }
} 