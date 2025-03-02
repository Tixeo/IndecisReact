"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Clock, ShareIcon } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useArticleById } from "@/hooks/use-articles"
import { useRouter } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
export default function NewPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const { data: session } = useSession()
  const { article, isLoading, error } = useArticleById("news", id)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !error && article && article.indice > 0 && !session) {
      router.push("/login")
    }
    if (article) {
      document.title = article.title;
    }
  }, [article, isLoading, error, session, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col mx-auto px-4">
        <SiteHeader />
        <main className="flex-1 py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="h-8 w-24 bg-muted animate-pulse rounded mb-4" />
            <div className="h-10 bg-muted animate-pulse rounded mb-6" />
            <div className="aspect-video bg-muted animate-pulse rounded mb-8" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-muted animate-pulse rounded w-full" />
              ))}
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="flex min-h-screen flex-col mx-auto px-4 items-center">
        <SiteHeader />
        <main className="flex-1 py-12 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">New not found</h1>
            <p className="text-muted-foreground mb-8">The new you are looking for does not exist or has been moved.</p>
            <Link href="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to news
              </Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col mx-auto px-4 items-center">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-16">
          <Link href="/news" className="inline-flex items-center text-sm mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to news
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{article.tag}</Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {article.indice} min of reading
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p>
          </div>

          <div className="rounded-lg overflow-hidden mb-8 aspect-video">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              disallowedElements={['script']}
            >
              {article.content}
            </Markdown>
          </div>

          <div className="mt-12 pt-6 border-t flex justify-between items-center">
            <Button variant="outline" onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.description,
                  url: window.location.href,
                })
                .then(() => console.log('Partage réussi'))
                .catch((error) => console.error('Erreur de partage', error));
              } else {
                alert('Le partage natif n\'est pas supporté sur ce navigateur.');
              }
            }}>
              <ShareIcon className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Link href="/news">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              More news
            </Button>
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
} 