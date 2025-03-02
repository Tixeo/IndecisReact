"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Shield, MessageSquare, LayoutGrid } from "lucide-react"

const features = [
  {
    title: "Permission Management",
    description: "Learn how to set up roles, permissions, and moderation systems to keep your server safe and organized.",
    icon: Shield,
    image: "/permission.png",
    imageAlt: "Discord permission settings interface",
    reverse: false,
  },
  {
    title: "Message Formatting",
    description: "Master Discord's rich text formatting, embeds, and message components to create engaging content.",
    icon: MessageSquare,
    image: "/embed.png",
    imageAlt: "Discord message formatting example",
    reverse: true,
  },
  {
    title: "Channel Organization",
    description: "Design an intuitive server structure with categories, channels, and forums that makes navigation effortless.",
    icon: LayoutGrid,
    image: "/channel.png",
    imageAlt: "Discord channel organization example",
    reverse: false,
  },
]

export function FeatureSection() {
  return (
    <section className="py-20 md:py-32 mx-auto max-w-7xl">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to master Discord
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Our comprehensive guides cover all aspects of Discord server management, from basic setup to advanced customization.
          </p>
        </div>
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureRow key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureRow({ feature }: { feature: typeof features[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="group"
    >
      <div className={`grid gap-8 md:grid-cols-2 md:gap-16 ${feature.reverse ? 'md:grid-flow-dense' : ''}`}>
        <div className={`flex flex-col justify-center space-y-4 ${feature.reverse ? 'md:col-start-2' : ''}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <feature.icon className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
        <motion.div 
          style={{ y }}
          className="relative aspect-video overflow-hidden rounded-lg border shadow-lg"
        >
          <img
            src={feature.image}
            alt={feature.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}