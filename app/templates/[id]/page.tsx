"use client"

import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Download, ShareIcon } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useArticleById } from "@/hooks/use-articles"
import { useRouter } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"

export default function TemplatePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const { data: session } = useSession()
  const { article, isLoading, error } = useArticleById("templates", id)
  const router = useRouter()

  // Si l'utilisateur n'est pas connecté et que l'article est verrouillé, redirigez-le
  useEffect(() => {
    if (!isLoading && !error && article && article.indice > 0 && !session) {
      router.push("/login")
    }
    if (article) {
      document.title = article.title; // Met à jour le titre de la page
    }
  }, [article, isLoading, error, session, router])

  const handleCopyTemplateUrl = () => {
    if (article) {
      navigator.clipboard.writeText(`${window.location.origin}/templates/${article.numeric_id}`)
    }
  }

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
      <div className="flex min-h-screen flex-col mx-auto px-4 items-center  ">
        <SiteHeader />
        <main className="flex-1 py-12 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Template non trouvé</h1>
            <p className="text-muted-foreground mb-8">Le template que vous recherchez n'existe pas ou a été déplacé.</p>
            <Link href="/templates">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux templates
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
      <main className="flex-1 py-12 md:py-16">
        <article className="container max-w-4xl py-12 md:py-16">
          <Link href="/templates" className="inline-flex items-center text-sm mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to templates
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{article.tag}</Badge>
              <span className="text-sm text-muted-foreground">
                {article.indice} downloads
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopyTemplateUrl}>
                <Copy className="mr-2 h-4 w-4" />
                Copy the URL
              </Button>
              <Button variant="outline">
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download the template
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
} 