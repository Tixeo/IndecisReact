import { NextRequest, NextResponse } from 'next/server';
import { getArticleByNumericId } from '@/lib/airtable';
import { getToken } from 'next-auth/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  const category = params.category;
  const id = parseInt(params.id);
  
  if (!category || !['guides', 'tutoriels', 'templates', 'news'].includes(category)) {
    return NextResponse.json(
      { error: 'Catégorie invalide' },
      { status: 400 }
    );
  }
  
  if (isNaN(id) || id <= 0 || id > 10000) {
    return NextResponse.json(
      { error: 'ID invalide' },
      { status: 400 }
    );
  }

  try {
    const article = await getArticleByNumericId(id, category as 'guides' | 'tutoriels' | 'templates');
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    if (article.indice > 0) {
      const token = await getToken({ req: request });
      if (!token) {
        return NextResponse.json({ 
          article: {
            id: article.id,
            title: article.title,
            description: article.description,
            tag: article.tag,
            indice: article.indice,
            image_url: article.image_url,
            premium: true,
          },
          requiresAuth: true
        });
      }
    }
    
    return NextResponse.json({ article });
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
    return NextResponse.json(
      { error: `Erreur lors de la récupération de l'article ${id}` },
      { status: 500 }
    );
  }
} 