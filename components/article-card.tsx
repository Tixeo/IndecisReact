"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Download, Lock } from "lucide-react";
import Link from "next/link";
import { type Article } from "@/lib/airtable";
import { useSession } from "next-auth/react";

type ArticleCardProps = {
  article: Article;
  type: "guide" | "tutorial" | "template";
};

export function ArticleCard({ article, type }: ArticleCardProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const locked = !isLoggedIn;
  
  const url = `/${type === "guide" ? "guides" : type === "tutorial" ? "tutorials" : "templates"}/${article.id}`;
  
  const getIndicatorContent = () => {
    if (type === "template") {
      return (
        <>
          <Download className="h-4 w-4" />
          <span>{article.indice}</span>
        </>
      );
    } else {
      return (
        <>
          <Clock className="h-4 w-4" />
          <span>{article.indice} min</span>
        </>
      );
    }
  };
  
  return (
    <Link href={url} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2 text-center">
                <Lock className="h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Login to unlock</p>
              </div>
            </div>
          )}
          {article.tag && article.tag.length > 0 && (
            <Badge className="absolute right-3 top-3">{article.tag[0]}</Badge>
          )}
        </div>
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-1">{article.title}</CardTitle>
          <CardDescription className="line-clamp-2">{article.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getIndicatorContent()}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 