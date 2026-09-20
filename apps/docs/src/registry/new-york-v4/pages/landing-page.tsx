"use client";

import { HeroSection } from "@/registry/new-york-v4/blocks/hero-section";
import { Button } from "@/registry/new-york-v4/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">MyApp</h1>
          <nav className="flex gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      <HeroSection />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fast Performance</CardTitle>
                <CardDescription>
                  Built with modern technologies for optimal speed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our platform is optimized for performance, ensuring your users
                  get the best experience possible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beautiful Design</CardTitle>
                <CardDescription>
                  Modern and clean user interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed with attention to detail, providing a beautiful and
                  intuitive user experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Simple setup and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get started in minutes with our straightforward integration
                  process and comprehensive documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of developers building amazing applications
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
