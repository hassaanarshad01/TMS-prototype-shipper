import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Package,
  MessageSquare,
  FileText,
  CheckCircle,
  Shield,
  BarChart3,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from './fallback/ImageWithFallback';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">SuperTransport LLC</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onSignIn}>
              Sign In
            </Button>
            <Button onClick={onSignUp}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary/30 to-accent/50">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                <span className="text-sm text-primary">Enterprise Transport Management</span>
              </div>
              <h1 className="text-5xl lg:text-6xl tracking-tight">
                Smart Load Management for Shipper Companies
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Create loads, negotiate with dispatchers, track shipments — all in one place.
                Streamline your logistics operations with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onSignUp} className="text-lg px-8">
                  Sign Up
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={onSignIn} className="text-lg px-8">
                  Sign In
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border h-80">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1618582948377-cd7eb0e8cb14?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Logistics warehouse"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple, efficient, and transparent</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                step: '01',
                title: 'Create Load Request',
                description: 'Enter shipment details, cargo info, and delivery timeline',
                icon: Package,
              },
              {
                step: '02',
                title: 'Negotiate with Dispatcher',
                description: 'Real-time messaging for pricing and logistics details',
                icon: MessageSquare,
              },
              {
                step: '03',
                title: 'Finalize & Upload Documents',
                description: 'Upload PDFs with OCR support or manual entry',
                icon: FileText,
              },
              {
                step: '04',
                title: 'Dispatcher Approval',
                description: 'One-hour approval window with status tracking',
                icon: Clock,
              },
              {
                step: '05',
                title: 'Load Locked & Tracked',
                description: 'Real-time shipment tracking from dispatch to delivery',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-primary">{item.step}</div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your shipments efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Load Creation & Negotiation',
                description:
                  'Create detailed load requests and negotiate terms directly with dispatchers in real-time',
                icon: Package,
              },
              {
                title: 'Real-Time Shipment Tracking',
                description:
                  'Monitor your cargo every step of the way with live status updates and timeline tracking',
                icon: MapPin,
              },
              {
                title: 'Document Upload (Manual + OCR)',
                description:
                  'Upload documents via PDF or image with automatic OCR extraction for quick data entry',
                icon: FileText,
              },
              {
                title: 'Invoice & Document History',
                description:
                  'Access complete audit trails of all invoices, documents, and load transactions',
                icon: BarChart3,
              },
              {
                title: 'Analytics & Reports',
                description:
                  'Gain insights with comprehensive analytics on costs, delivery times, and performance',
                icon: TrendingUp,
              },
              {
                title: 'Approval Workflow',
                description:
                  'Structured approval process with time-based validation and status notifications',
                icon: CheckCircle,
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-6">
                <span className="text-sm text-primary">Enterprise Security</span>
              </div>
              <h2 className="text-4xl mb-6">Trust & Security</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Role-Based Access Control',
                    description:
                      'Granular permissions ensure each user sees only what they need to see',
                    icon: Shield,
                  },
                  {
                    title: 'Document Approval Workflow',
                    description:
                      'Multi-step verification process with time-stamped approval tracking',
                    icon: CheckCircle,
                  },
                  {
                    title: 'Audit-Friendly History',
                    description: 'Complete activity logs for compliance and transparency',
                    icon: FileText,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761264889291-52edcd3979b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2ODY1NzE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Security dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl mb-6 text-primary-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join leading shipper companies using SuperTransport to streamline their logistics operations
          </p>
          <Button size="lg" variant="secondary" onClick={onSignUp} className="text-lg px-8">
            Create Your Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">ShipperTMS LLC</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise transport management for modern shipper companies
              </p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 SuperTransport LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
