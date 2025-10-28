"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "./icons";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Web Developer", "Engineer", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left relative z-20">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                <span className="gradient-text">Fahim Hossain Zarif</span>
              </h1>

              <div className="h-12 sm:h-14 flex items-center justify-center lg:justify-start">
                <p className="text-2xl sm:text-3xl font-mono font-semibold text-primary">
                  <span
                    className="inline-block animate-fade-in"
                    key={currentRole}
                  >
                    {roles[currentRole]}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-pretty leading-relaxed">
              Innovative and results-driven ETE Engineer with strong expertise
              in software development, web technologies, and IoT systems.
              Skilled in building robust, scalable, and user-centric
              applications using React.js, Next.js, Node.js and Tailwind CSS.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4">
              <Button size="lg" className="group">
                <a href="#projects" className="flex items-center gap-2">
                  View My Work
                  <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" className="group">
                <a
                  href="/Fahim_RUET_Resume.pdf"
                  target="_blank" // open in new tab
                  rel="noopener noreferrer" // security best practice
                  className="flex items-center gap-2"
                >
                  Download CV
                </a>
              </Button>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/md-fahim18"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/md-fahim-9601391ba/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:fahimzarif678@gmail.com">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing Backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-full blur-3xl scale-125 animate-pulse pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl scale-110 pointer-events-none" />

              {/* Main Image */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
                <img
                  src="/images/design-mode/image.png"
                  alt="Fahim Hossain Zarif - Full Stack Developer"
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              </div>

              {/* Floating Tech Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg pointer-events-none">
                <span className="text-primary font-mono text-lg font-bold">
                  {"</>"}
                </span>
              </div>

              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/30 shadow-lg pointer-events-none">
                <span className="text-accent text-2xl">⚡</span>
              </div>

              {/* <div className="absolute top-1/2 -left-10 w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg pointer-events-none">
                <span className="text-primary text-lg">⚛️</span>
              </div>

              <div className="absolute top-8 right-1/4 w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/30 shadow-lg pointer-events-none">
                <span className="text-accent font-mono text-sm">JS</span>
              </div> */}

              {/* Particle effects */}
              <div className="absolute top-1/4 right-8 w-2 h-2 bg-primary rounded-full pointer-events-none" />
              <div className="absolute bottom-1/4 left-12 w-2 h-2 bg-accent rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
