"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Download, Eye, Lock, Copy, Clipboard } from "lucide-react"
import { toast, Toaster } from 'sonner';
import Link from "next/link"
import { useArticlesByCategory } from "@/hooks/use-articles"
import { useSession } from "next-auth/react"
import { Article } from "@/lib/airtable"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<Article | null>(null)
  const { data: session } = useSession()
  const { articles, isLoading, error } = useArticlesByCategory("templates")
  
  console.log("Articles reçus:", articles)
  console.log("Erreur:", error)
  console.log("Chargement:", isLoading)
  
  // Liste unique de tags extraits des articles
  const uniqueTags = articles ? 
    ["all", ...Array.from(new Set(articles.filter(article => article.tag).map(article => article.tag)))] : 
    ["all"]
  
  const filteredTemplates = articles ? articles.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = activeTag === "all" || template.tag.toLowerCase() === activeTag.toLowerCase()
    
    return matchesSearch && matchesTag
  }) : []

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Template copied !", {
          className: 'sonner-toast', // Classe pour le mode sombre
        });
      })
      .catch(err => {
        console.error("Erreur lors de la copie : ", err);
        toast.error("Error copying template !", {
          className: 'sonner-toast',
        });
      });
  };

  return (
    <div className="flex min-h-screen flex-col mx-auto items-center">
      <SiteHeader />
      <main className="flex-1 px-4">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" 
                  style={{ fontFamily: 'MILKER', letterSpacing: '0.02em' }}>
                Discord Templates
              </h1>
              <p className="mb-8 text-muted-foreground md:text-xl">
                Ready-to-use Discord server templates to get started quickly with your community.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTag}>
              <TabsList className="mx-auto flex justify-center flex-wrap">
                {uniqueTags.map(tag => (
                  <TabsTrigger key={tag} value={tag}>
                    {tag === "all" ? "All" : tag}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="h-full overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse" />
                    <CardHeader className="p-4">
                      <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-lg text-red-500">Error loading templates. Please try again later.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <p className="text-lg text-muted-foreground">No templates match your search.</p>
                  </div>
                ) : (
                  filteredTemplates.map((template) => (
                    <Dialog key={template.id}>
                      <DialogTrigger asChild>
                        <Card 
                          className="h-full overflow-hidden transition-all hover:shadow-md cursor-pointer" 
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={template.image_url}
                              alt={template.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {template.indice > 0 && !session && (
                              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2 text-center">
                                  <Lock className="h-8 w-8 text-muted-foreground" />
                                  <p className="font-medium">Connect to unlock</p>
                                </div>
                              </div>
                            )}
                            <Badge className="absolute right-3 top-3">{template.tag}</Badge>
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="line-clamp-1">{template.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {/*<Download className="h-4 w-4" />
                              <span>{template.indice}</span>*/}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                disabled={template.indice > 0 && !session}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(template.content);
                                }}
                              >
                                <Clipboard className="h-4 w-4" />
                                <span className="sr-only">Copier le contenu</span>
                              </Button> 
                            </div>
                          </CardFooter>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl" style={{ opacity: 1, backgroundColor: '#2c2f33' }}>
                        <DialogHeader>
                          <DialogTitle>{selectedTemplate?.title}</DialogTitle>
                          <DialogDescription>{selectedTemplate?.description}</DialogDescription>
                        </DialogHeader>
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img
                            src={selectedTemplate?.image_url}
                            alt={selectedTemplate?.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            onClick={() => selectedTemplate && copyToClipboard(selectedTemplate.content)}
                            disabled={selectedTemplate ? selectedTemplate.indice > 0 && !session : true}
                          >
                            <Clipboard className="mr-2 h-4 w-4" />
                            Copier le contenu
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                )}
              </div>
            )}

            {filteredTemplates.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load more
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Toaster />
      <SiteFooter />
    </div>
  )
}