"use client";

import { useState, useEffect } from 'react';
import { Article } from '@/lib/airtable';

// Hook pour récupérer tous les articles
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Une erreur est survenue'));
        console.error('Erreur lors de la récupération des articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}

// Hook pour récupérer les articles par catégorie
export function useArticlesByCategory(category: "guides" | "tutoriels" | "templates" | "news") {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/articles?category=${category}`);
        console.log("Statut de la réponse:", response.status);
        const rawData = await response.text();
        console.log("Données brutes:", rawData);
        
        let data;
        try {
          data = JSON.parse(rawData);
          console.log("Données parsées:", data);
        } catch (parseError) {
          console.error("Erreur de parsing JSON:", parseError);
          setError(new Error("Format de réponse invalide"));
          return;
        }
        
        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error("Format de données inattendu:", data);
          setArticles([]);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des articles:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, [category]);

  return { articles, isLoading, error };
}

// Hook pour récupérer un article par son ID
export function useArticleById(category: 'guides' | 'tutoriels' | 'templates' | 'news', id: number) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/articles/${category}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération de l'article ${id}`);
        }
        
        const data = await response.json();
        setArticle(data.article);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Une erreur est survenue'));
        console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleById();
  }, [category, id]);

  return { article, isLoading, error };
} 