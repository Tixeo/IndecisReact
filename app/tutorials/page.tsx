"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, BookOpen, Lock } from "lucide-react"
import Link from "next/link"
import { useArticlesByCategory } from "@/hooks/use-articles"
import { useSession } from "next-auth/react"

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState("all")
  const { data: session } = useSession()
  const { articles, isLoading, error } = useArticlesByCategory("tutoriels")
  
  // Liste unique de tags extraits des articles
  const uniqueTags = articles ? 
    ["all", ...Array.from(new Set(articles.map(article => article.tag)))] : 
    ["all"]
  
  const filteredTutorials = articles ? articles.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = activeTag === "all" || tutorial.tag.toLowerCase() === activeTag.toLowerCase()
    
    return matchesSearch && matchesTag
  }) : []

  return (
    <div className="flex min-h-screen flex-col mx-auto items-center">
      <SiteHeader />
      <main className="flex-1 px-4">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: 'MILKER', letterSpacing: '0.02em' }}>
                Tutorials Discord
              </h1>
              <p className="mb-8 text-muted-foreground md:text-xl">
                Learn everything you need to build, manage, and grow the perfect Discord community with our comprehensive guides and tutorials.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tutorials..."
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
                <p className="text-lg text-red-500">Error loading tutorials. Please try again later.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTutorials.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <p className="text-lg text-muted-foreground">No tutorials match your search.</p>
                  </div>
                ) : (
                  filteredTutorials.map((tutorial) => (
                    <Link href={`/tutorials/${tutorial.numeric_id}`} key={tutorial.id} className="group">
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={tutorial.image_url}
                            alt={tutorial.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {tutorial.indice > 0 && !session && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                              <div className="flex flex-col items-center gap-2 text-center">
                                <Lock className="h-8 w-8 text-muted-foreground" />
                                <p className="font-medium">Connect to unlock</p>
                              </div>
                            </div>
                          )}
                          <Badge className="absolute right-3 top-3">{tutorial.tag}</Badge>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="line-clamp-1">{tutorial.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{tutorial.indice} min</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            )}

            {filteredTutorials.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load more
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}