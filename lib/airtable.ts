import Airtable from 'airtable';

// Dans lib/airtable.ts - Isoler la configuration des clés API
function getAirtableConfig() {
  // Validation de la présence des clés requises
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Configuration Airtable manquante');
  }
  
  return {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID
  };
}

// Utilisez cette fonction pour obtenir la configuration
const config = getAirtableConfig();
const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

// Interface pour les articles
export interface Article {
  image: string | undefined;
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'guides' | 'tutoriels' | 'templates' | 'news';
  image_url: string;
  tag: string;
  numeric_id: number;
  indice: number;
}

// Fonction pour récupérer tous les articles
export async function getAllArticles(): Promise<Article[]> {
  try {
    const records = await base('Articles').select({
      view: 'Grid view'
    }).all();
    
    console.log("DÉBOGAGE - Tous les articles trouvés:", records.length);
    console.log("DÉBOGAGE - Catégories disponibles:", 
      Array.from(new Set(records.map(record => record.get('category')))));
    
    return records.map(record => ({
      id: record.id,
      title: record.get('title') as string,
      description: record.get('description') as string,
      content: record.get('content') as string,
      category: record.get('category') as 'guides' | 'tutoriels' | 'templates' | 'news',
      image_url: record.get('image_url') as string,
      tag: record.get('tag') as string,
      numeric_id: record.get('ID') as number,
      indice: record.get('indice') as number,
      image: record.get('image') as string | undefined,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
}

// Fonction pour récupérer les articles par catégorie
export async function getArticlesByCategory(category: 'guides' | 'tutoriels' | 'templates' | 'news'): Promise<Article[]> {
  console.log("Recherche d'articles pour la catégorie:", category);
  try {
    const records = await base('Articles')
      .select({
        filterByFormula: `{category} = '${category}'`,
        view: 'Grid view'
      })
      .all();
    
    const articles = records.map(record => ({
      id: record.id,
      title: record.get('title') as string,
      description: record.get('description') as string,
      content: record.get('content') as string,
      category: record.get('category') as 'guides' | 'tutoriels' | 'templates' | 'news',
      image_url: record.get('image_url') as string,
      tag: record.get('tag') as string,
      numeric_id: record.get('ID') as number,
      indice: record.get('indice') as number,
      image: record.get('image') as string | undefined,
    }));
    
    return articles;
  } catch (error) {
    console.error(`Erreur lors de la récupération des articles (${category}):`, error);
    throw error;
  }
}

// Fonction pour récupérer un article par son ID
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const record = await base('Articles').find(id);
    
    return {
      id: record.id,
      title: record.get('title') as string,
      description: record.get('description') as string,
      content: record.get('content') as string,
      category: record.get('category') as 'guides' | 'tutoriels' | 'templates' | 'news',
      image_url: record.get('image_url') as string,
      tag: record.get('tag') as string,
      numeric_id: record.get('ID') as number,
      indice: record.get('indice') as number,
      image: record.get('image') as string | undefined,
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
    return null;
  }
}

// Fonction pour récupérer un article par son ID numérique
export async function getArticleByNumericId(numericId: number, category: 'guides' | 'tutoriels' | 'templates'): Promise<Article | null> {
  try {
    const records = await base('Articles').select({
      filterByFormula: `AND({ID} = ${numericId}, {category} = '${category}')`,
      maxRecords: 1
    }).firstPage();
    
    if (records.length === 0) {
      return null;
    }
    
    const record = records[0];
    return {
      id: record.id,
      title: record.get('title') as string,
      description: record.get('description') as string,
      content: record.get('content') as string,
      category: record.get('category') as 'guides' | 'tutoriels' | 'templates',
      image_url: record.get('image_url') as string,
      tag: record.get('tag') as string,
      numeric_id: record.get('ID') as number,
      indice: record.get('indice') as number,
      image: record.get('image') as string | undefined,
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article avec ID numérique ${numericId}:`, error);
    return null;
  }
} 