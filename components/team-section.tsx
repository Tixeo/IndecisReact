"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

const creators = [
  {
    name: "Indécis",
    role: "Founder",
    image: "/team/creator1.png",
    twitter: "https://twitter.com/RatioByLeteck",
    github: "https://github.com/",
  },
  {
    name: "Tix",
    role: "Web Developer",
    image: "https://images-ext-1.discordapp.net/external/e0TR4wnXma-ZAPqnmggSeUrXxpkNcMGeCVrWJxQFME0/%3Fsize%3D512/https/cdn.discordapp.com/avatars/523928544859127838/2fffb1fc8ebadb63f1969eb7ec3988c4.webp?format=webp",
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
  {
    name: "Creator 3",
    role: "Co-founder",
    image: "/team/creator3.png",
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
]
export function TeamSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Team
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Meet the passionate creators who brought this platform to life.
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-3">
          {creators.map((creator, index) => (
            <TeamMember key={index} creator={creator} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamMember({ creator, index }: { creator: typeof creators[0], index: number }) {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-background p-6 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-6 aspect-square overflow-hidden rounded-full border-4 border-primary/70 mx-auto w-48">
        <img
          src={creator.image}
          alt={creator.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
        <p className="text-muted-foreground mb-4">{creator.role}</p>
        
        {/*<div className="flex justify-center gap-4">
          <Link href={creator.twitter} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href={creator.github} className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
        </div>*/}
      </div>
    </motion.div>
  )
} 