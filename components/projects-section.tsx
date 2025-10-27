"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "./icons";

const projects = [
  {
    title: "Bornobyte EduTech Platform",
    description:
      "A modern, full-stack e-learning platform. It features secure authentication, video-based courses, dynamic progress tracking, and a clean, responsive dashboard for students and instructors. Designed to deliver a smooth and engaging online learning experience across all devices..",
    image: "https://i.ibb.co.com/BVqxYh7J/image.png",
    technologies: [
      "React",
      "Node.js",
      "ExpressJS",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
    ],
    liveUrl: "https://bornobyte-edu.web.app/",
    githubUrl: "https://github.com/md-fahim18/BornoByte-Edutech",
  },
  {
    title: "Security Company",
    description:
      "A professional, full-featured website for a security services company. It showcases services, team information, and client testimonials in a clean, responsive, and modern interface, emphasizing trust, reliability, and brand professionalism.",
    image: "https://i.ibb.co.com/DPxB3r14/image.png",
    technologies: [
      "React.js",
      "HTML5",
      "Tailwind CSS",
      "NextJS",
      "Framer Motion",
    ],
    liveUrl: "https://vanguardssecurity.netlify.app/",
    githubUrl: "https://github.com/md-fahim18/Vanguards-Security",
  },
  {
    title: "Todos Productive dashboard",
    description:
      "A sleek, modern workspace which brings together task management, Pomodoro timing, notes and inspirational quotes into a unified, responsive dashboard.",
    image: "https://i.ibb.co.com/N2pnCwBT/image.png",
    technologies: ["React", "Tailwind", "Javascript", "HTML5", "Framer-Motion"],
    liveUrl: "https://todos-dashboard.netlify.app/",
    githubUrl: "https://github.com/md-fahim18/Productivity-AI",
  },
  {
    title: "News Portal Global",
    description:
      "This is a dynamic, real-time news portal built with React.js and deployed on Vercel. It aggregates the latest headlines from multiple sources, offering users a seamless experience across various categories such as World, Technology, Sports, and Entertainment.",
    image: "https://i.ibb.co.com/6Jv1BmvP/image.png",
    technologies: ["React.js", "Tailwind", "DaisyUI", "Javascript", "News API"],
    liveUrl: "https://newsportalglobal.vercel.app/",
    githubUrl: "https://github.com/md-fahim18/News-Portal",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Here are some of my recent projects that showcase my skills in
            full-stack development, UI/UX design, and modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className="flex">
              <Card className="glass hover:bg-card/90 transition-all duration-300 group overflow-hidden flex flex-col flex-1">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
