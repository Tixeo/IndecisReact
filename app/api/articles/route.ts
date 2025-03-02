import { NextResponse } from "next/server";
import { getAllArticles, getArticlesByCategory } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  
  let articles;
  if (category && ['guides', 'tutoriels', 'templates', 'news'].includes(category)) {
    articles = await getArticlesByCategory(category as 'guides' | 'tutoriels' | 'templates' | 'news');
  } else {
    articles = await getAllArticles();
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    articles = articles.filter(
      (article) => 
        article.title.toLowerCase().includes(searchLower) || 
        article.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (tag) {
    articles = articles.filter(
      (article) => article.tag && article.tag.includes(tag)
    );
  }
  
  return NextResponse.json(articles);
}

// export async function GETAll(
