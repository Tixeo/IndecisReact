"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash, Eye, BarChart3, Users, FileText, Layout } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getAllArticles } from "@/lib/airtable"
import { Article } from "@/lib/airtable"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

// Mock data for content
const content = [
  {
    id: 1,
    title: "Setting Up Your First Discord Server",
    type: "Tutorial",
    status: "Published",
    author: "John Doe",
    date: "2025-03-15",
    views: 1245,
  },
  {
    id: 2,
    title: "Advanced Role Management",
    type: "Tutorial",
    status: "Draft",
    author: "Jane Smith",
    date: "2025-03-10",
    views: 0,
  },
  {
    id: 3,
    title: "Complete Guide to Discord Permissions",
    type: "Guide",
    status: "Published",
    author: "John Doe",
    date: "2025-03-05",
    views: 876,
  },
  {
    id: 4,
    title: "Gaming Community",
    type: "Template",
    status: "Published",
    author: "Jane Smith",
    date: "2025-02-28",
    views: 2547,
  },
  {
    id: 5,
    title: "Creating Custom Emojis and Stickers",
    type: "Tutorial",
    status: "Published",
    author: "John Doe",
    date: "2025-02-20",
    views: 654,
  },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tag: "",
    image_url: "",
    indice: 0
  })
  const [editArticle, setEditArticle] = useState<Article | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  
  useEffect(() => {
    if (status === "loading") return
    if (!session || (session.user.id !== "523928544859127838" && session.user.id !== "237342193340252161")) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [session, status, router])

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoadingArticles(true)
        const response = await fetch('/api/articles')
        const data = await response.json()
        console.log("Articles récupérés:", data)
        setArticles(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error)
      } finally {
        setIsLoadingArticles(false)
      }
    }

    if (!loading) {
      fetchArticles()
    }
  }, [loading])

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.description || !newArticle.content || !newArticle.category || !newArticle.tag || !newArticle.image_url) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      setIsCreating(true)
      const response = await fetch('/api/articles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'article')
      }

      const data = await response.json()
      toast.success("Article créé avec succès")
      setIsDialogOpen(false)
      // Rafraîchir la liste des articles
      const newArticlesResponse = await fetch('/api/articles')
      const newArticlesData = await newArticlesResponse.json()
      setArticles(newArticlesData)
      // Réinitialiser le formulaire
      setNewArticle({
        title: "",
        description: "",
        content: "",
        category: "",
        tag: "",
        image_url: "",
        indice: 0
      })
    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Erreur lors de la création de l'article")
    } finally {
      setIsCreating(false)
    }
  }

  const handleEditClick = (article: Article) => {
    setEditArticle(article)
    setIsEditDialogOpen(true)
  }

  const handleUpdateArticle = async () => {
    if (!editArticle || !editArticle.title || !editArticle.description || !editArticle.content || !editArticle.category || !editArticle.image_url) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      setIsUpdating(true)
      const response = await fetch('/api/articles/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editArticle),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'article')
      }

      const data = await response.json()
      toast.success("Article mis à jour avec succès")
      setIsEditDialogOpen(false)
      // Rafraîchir la liste des articles
      const newArticlesResponse = await fetch('/api/articles')
      const newArticlesData = await newArticlesResponse.json()
      setArticles(newArticlesData)
      // Réinitialiser le formulaire
      setEditArticle(null)
    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Erreur lors de la mise à jour de l'article")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setSelectedArticleId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteArticle = async () => {
    if (!selectedArticleId) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/articles/delete?id=${selectedArticleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'article')
      }

      // Rafraîchir la liste des articles
      const newArticlesResponse = await fetch('/api/articles')
      const newArticlesData = await newArticlesResponse.json()
      setArticles(newArticlesData)
      
      toast.success("Article supprimé avec succès")
    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Erreur lors de la suppression de l'article")
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSelectedArticleId(null)
    }
  }

  if (loading) {
    return null
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeTab === "all" || article.category.toLowerCase() === activeTab.toLowerCase()
    
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen flex-col mx-auto items-center">
      <SiteHeader />
      <main className="flex-1 px-4 ">
        <section className=" py-8">
          <div className="container">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your Discord Academy content</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Content
                  </Button>
                </DialogTrigger>  
                <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-background border shadow-lg" style={{ opacity: 1, backgroundColor: '#2c2f33' }}>
                  <DialogHeader>
                    <DialogTitle>Créer un nouvel article</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations ci-dessous pour créer un nouvel article.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        placeholder="Titre de l'article"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newArticle.description}
                        onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                        placeholder="Description de l'article"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Contenu</Label>
                      <Textarea
                        id="content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                        placeholder="Contenu de l'article"
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={newArticle.category}
                        onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tutoriels">Tutoriels</SelectItem>
                          <SelectItem value="guides">Guides</SelectItem>
                          <SelectItem value="templates">Templates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tag">Tag</Label>
                      <Input
                        id="tag"
                        value={newArticle.tag}
                        onChange={(e) => setNewArticle({ ...newArticle, tag: e.target.value })}
                        placeholder="Tag de l'article"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image_url">URL de l'image</Label>
                      <Input
                        id="image_url"
                        value={newArticle.image_url}
                        onChange={(e) => setNewArticle({ ...newArticle, image_url: e.target.value })}
                        placeholder="URL de l'image"
                        type="url"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="indice">Indice</Label>
                      <Input
                        id="indice"
                        value={newArticle.indice}
                        onChange={(e) => setNewArticle({ ...newArticle, indice: parseInt(e.target.value) || 0 })}
                        placeholder="Indice de l'article"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreateArticle} disabled={isCreating}>
                      {isCreating ? "Création..." : "Créer l'article"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container">
            <div className="mt-8 space-y-4">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="tutoriels">Tutoriels</TabsTrigger>
                    <TabsTrigger value="guides">Guides</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un article..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  {isLoadingArticles ? (
                    <div className="p-8 text-center">
                      <p>Chargement des articles...</p>
                    </div>
                  ) : filteredArticles.length === 0 ? (
                    <div className="p-8 text-center">
                      <p>Aucun article trouvé</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Tag</TableHead>
                          <TableHead>Indice</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredArticles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell>{article.numeric_id}</TableCell>
                            <TableCell className="font-medium">
                              <Link 
                                href={`/${article.category === 'tutoriels' ? 'tutorials' : article.category}/${article.numeric_id}`}
                                target="_blank"
                                className="hover:underline"
                              >
                                {article.title}
                              </Link>
                            </TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell>{article.tag}</TableCell>
                            <TableCell>{article.indice}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/${article.category === 'tutoriels' ? 'tutorials' : article.category}/${article.numeric_id}`}
                                      target="_blank"
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      Voir
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditClick(article)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => handleDeleteClick(article.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-background border shadow-lg" style={{ opacity: 1, backgroundColor: '#2c2f33' }}>
          <DialogHeader>
            <DialogTitle>Modifier l'article</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'article ci-dessous.
            </DialogDescription>
          </DialogHeader>
          {editArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input
                  id="edit-title"
                  value={editArticle.title}
                  onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
                  placeholder="Titre de l'article"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editArticle.description}
                  onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })}
                  placeholder="Description de l'article"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Contenu</Label>
                <Textarea
                  id="edit-content"
                  value={editArticle.content}
                  onChange={(e) => setEditArticle({ ...editArticle, content: e.target.value })}
                  placeholder="Contenu de l'article"
                  className="min-h-[200px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Catégorie</Label>
                <Select
                  value={editArticle.category}
                  onValueChange={(value) => setEditArticle({ ...editArticle, category: value as 'guides' | 'tutoriels' | 'templates' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutoriels">Tutoriels</SelectItem>
                    <SelectItem value="guides">Guides</SelectItem>
                    <SelectItem value="templates">Templates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-tag">Tag</Label>
                <Input
                  id="edit-tag"
                  value={editArticle.tag}
                  onChange={(e) => setEditArticle({ ...editArticle, tag: e.target.value })}
                  placeholder="Tag de l'article"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image_url">URL de l'image</Label>
                <Input
                  id="edit-image_url"
                  value={editArticle.image_url}
                  onChange={(e) => setEditArticle({ ...editArticle, image_url: e.target.value })}
                  placeholder="URL de l'image"
                  type="url"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-indice">Indice</Label>
                <Input
                  id="edit-indice"
                  value={editArticle.indice}
                  onChange={(e) => setEditArticle({ ...editArticle, indice: parseInt(e.target.value) || 0 })}
                  placeholder="Indice de l'article"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateArticle} disabled={isUpdating}>
              {isUpdating ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet article?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'article sera définitivement supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteArticle}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}