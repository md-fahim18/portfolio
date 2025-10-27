"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Wrench } from "./icons"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
      "Zustand",
      "HTML5",
      "CSS3",
      "SASS",
    ],
  },
  {
    title: "Backend",
    icon: Database,
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Prisma",
      "Supabase",
      "Firebase",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "GitHub Actions",
      "Jest",
      "Cypress",
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier",
      "Figma",
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I work with a diverse set of technologies to build robust, scalable applications that meet modern web
            standards and user expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={category.title}>
              <Card className="glass hover:bg-card/90 transition-colors duration-300 h-full">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill}>
                        <Badge
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
