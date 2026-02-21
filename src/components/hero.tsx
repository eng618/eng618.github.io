'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="bg-background relative overflow-hidden py-20 lg:py-32">
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_100%_0%,var(--color-accent),transparent)] opacity-50" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground mb-2 font-sans text-xl tracking-wider"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              className="font-outfit mb-8 text-5xl leading-tight font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            >
              <span className="from-foreground via-foreground/90 to-primary bg-gradient-to-br bg-clip-text text-transparent drop-shadow-[0_0_40px_rgb(var(--primary)_/_0.15)]">
                Eric N. Garcia
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground max-w-xl text-xl leading-relaxed lg:text-2xl"
            >
              System Architect at Verizon with over a decade of experience designing and implementing complex, scalable
              enterprise solutions.
            </motion.p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative aspect-square w-full max-w-[400px]"
            >
              <div className="bg-primary/10 absolute inset-0 rounded-full blur-[60px]" />
              {/* Note: In a real migration, we'd use the actual vector/image */}
              <div className="border-border bg-card/50 relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-sm">
                <Image
                  src="/hero-vector.svg"
                  alt="Architectural Illustration"
                  fill
                  className="object-contain p-8 opacity-60 dark:opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
