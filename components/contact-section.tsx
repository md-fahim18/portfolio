"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "./icons";
import { CheckCircle2 } from "lucide-react"; // ✅ import from lucide-react
import { motion, AnimatePresence } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "fahimzarif678@gmail.com",
    href: "mailto:fahimzarif678@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+8801648960735",
    href: "tel:+8801648960735",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const formBody = new FormData();
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("subject", formData.subject);
      formBody.append("message", formData.message);

      const response = await fetch(
        "https://formspree.io/f/myzndeqn", // <-- replace with your Formspree ID
        {
          method: "POST",
          body: formBody,
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.errors
            ? data.errors.map((err: any) => err.message).join(", ")
            : "Failed to send message.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have a project in mind? I'd love to hear about it. Let's discuss how
            we can bring your ideas to life with modern web technologies.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center lg:text-left">
            Get in Touch
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left column */}
          <Card className="glass flex flex-col h-full">
            <CardContent className="space-y-4 p-6 flex-grow flex flex-col justify-between">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="flex items-center gap-4 bg-background/40 rounded-xl p-4 hover:bg-background/70 transition"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Right column */}
          <Card className="glass flex flex-col h-full">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-lg flex items-center gap-2 ${
                        status.type === "success"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {status.type === "success" && (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                      <p>{status.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
