"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Hash, Shield, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-[length:16px_16px] dark:bg-grid-small-white/[0.05]" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ fontFamily: 'MILKER', letterSpacing: '0.02em' }}>
                Create Your <span className="text-[#5865F2]">Dream Server</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Learn everything you need to build, manage, and grow the perfect Discord community with our comprehensive guides and tutorials.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#5865F2] hover:bg-[#4752c4] text-white">
                <Link href="/tutorials">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#5865F2]" />
                <span className="text-sm">Permission Management</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-[#5865F2]" />
                <span className="text-sm">Channel Organization</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#5865F2]" />
                <span className="text-sm">Bot Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#5865F2]" />
                <span className="text-sm">Community Building</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-lg border shadow-xl">
              <img
                src="/discord.png"
                alt="Discord server dashboard"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}