"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Disc } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-[#5865F2] px-6 py-16 md:px-12 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5" />
          <div className="relative mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to transform your Discord server?
            </h2>
            <p className="mb-10 text-lg opacity-90 md:text-xl">
              Join thousands of community managers who have leveled up their Discord skills with our platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-[#5865F2] hover:bg-white/90">
                <Link href="/tutorials">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="https://discord.gg/servermaker" target="_blank">
                  <img src="/LogoSansFondWhiteIcon.png" alt="Server Maker Logo" className="mr-2 h-4 w-4" />
                  Join Our Community
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}