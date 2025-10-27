"use client"

import { Card } from "@/components/ui/card"
import { Code, Rocket, Users, Zap } from "./icons"

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing applications for speed and user experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with cross-functional teams",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Staying current with the latest technologies and best practices",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground text-pretty">
              I'm a passionate Full Stack Developer with expertise in building modern web applications that deliver
              exceptional user experiences. My journey in software development has taken me across various industries,
              from startups to enterprise solutions.
            </p>

            <p className="text-lg text-muted-foreground text-pretty">
              Currently, I specialize in React, Node.js, and cloud technologies, focusing on creating scalable
              applications that solve real-world problems. I believe in writing clean, maintainable code and staying
              up-to-date with the latest industry trends.
            </p>

            <p className="text-lg text-muted-foreground text-pretty">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div key={highlight.title} className="flex">
                <Card className="p-6 glass hover:bg-card/90 transition-colors duration-300 flex flex-col flex-1">
                  <highlight.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty flex-1">{highlight.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
