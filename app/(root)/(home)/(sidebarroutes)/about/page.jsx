import React from 'react';
import Link from 'next/link';
import { 
  Crown, Sparkles, BookOpen, Brain, Globe, Heart, Target, Zap,
  ArrowRight, CheckCircle, MessageCircle, Lightbulb, Layers, Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Us',
  description: 'Best Vocabulary is your free platform to master the art of choosing words. Learn about our mission to make vocabulary learning accessible, effective, and enjoyable for everyone.',
  keywords: ['about best vocabulary', 'vocabulary learning platform', 'free dictionary', 'word learning'],
  openGraph: {
    title: 'About Us | Best Vocabulary',
    description: 'Learn about our mission to make vocabulary learning accessible, effective, and enjoyable for everyone.',
  },
};

const stats = [
  { value: '10,000+', label: 'Words', icon: BookOpen },
  { value: '50,000+', label: 'Definitions', icon: Lightbulb },
  { value: '100+', label: 'Categories', icon: Layers },
  { value: 'Free', label: 'Forever', icon: Heart },
];

const values = [
  {
    icon: Target,
    title: 'Accessibility',
    description: 'Free vocabulary learning for everyone, everywhere. No paywalls, no subscriptions required.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Meaning is the situation a word fits. Our AI and enriched word-relations database help you find the exact word for any moment.',
  },
  {
    icon: Brain,
    title: 'Effective Learning',
    description: 'Research-backed methods including mnemonics, contextual examples, and interactive exercises.',
  },
  {
    icon: Heart,
    title: 'Passion for Words',
    description: 'Built by word lovers, for word lovers. We believe vocabulary enriches life.',
  },
];

const features = [
  'AI-powered semantic search',
  'Rich definitions with examples',
  'Etymology and word origins',
  'Interactive quizzes',
  'Flashcard learning',
  'Word of the Day',
  'Saved words & progress',
  'Dark mode support',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Crown className="h-4 w-4" />
            About Us
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Making vocabulary learning
            <span className="text-primary block mt-2">accessible to everyone</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Best Vocabulary is on a mission to help people discover, learn, and master new words 
            through innovative AI-powered tools and engaging learning experiences.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dictionary">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                <Sparkles className="h-4 w-4" /> Try AI Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Target className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Empowering communication through words
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that a rich vocabulary is the foundation of effective communication. 
                Whether you&apos;re a student, professional, writer, or simply someone who loves 
                language, Best Vocabulary provides the tools you need to express yourself better.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform combines traditional dictionary features with modern AI technology. 
                When you search for a word, you’re often searching for a situation—that moment when you think, &quot;What’s the exact word for this?&quot; 
                Describe the feeling or context; our AI and enriched database of word relations let you search by meaning in a more advanced way.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Zap className="h-4 w-4" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to master vocabulary
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A comprehensive suite of tools designed to make vocabulary learning effective and enjoyable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl border bg-card">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Globe className="h-4 w-4" />
              Why Best Vocabulary
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What makes us different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border bg-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI-Powered Search</h3>
              <p className="text-sm text-muted-foreground">
                Describe a concept and let AI find the perfect word. No more tip-of-tongue frustration.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Learn Actively</h3>
              <p className="text-sm text-muted-foreground">
                Quizzes, flashcards, and interactive exercises help you retain new words effectively.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Map className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Rich Context</h3>
              <p className="text-sm text-muted-foreground">
                Etymology, usage examples, mnemonics, and word relationships for deeper understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 md:p-14 rounded-3xl border bg-card shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have questions or feedback?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              We&apos;d love to hear from you. Whether you have a feature request, found a bug, 
              or just want to say hi – we&apos;re all ears.
            </p>
            
            <Link href="mailto:bestvocabularyramblerrana@gmail.com">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to expand your vocabulary?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start learning new words today – completely free.
          </p>
          <Link href="/dictionary">
            <Button size="lg" className="rounded-full px-10 gap-2 shadow-lg shadow-primary/20">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
