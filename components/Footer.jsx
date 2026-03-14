import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Youtube, Mail, Heart, MapPin } from 'lucide-react';

const footerLinks = {
  features: [
    { name: 'Dictionary', href: '/dictionary' },
    { name: 'Word of the Day', href: '/wordofday' },
    { name: 'AI Search', href: '/search' },
    { name: 'Random Word', href: '/random' },
    { name: 'Origin Maps', href: '/origins' },
  ],
  learn: [
    { name: 'Quiz', href: '/quiz' },
    { name: 'Flashcards', href: '/flashcards' },
    { name: 'Bookmarks', href: '/bookmarks' },
    { name: 'All Categories', href: '/categories' },
  ],
  categories: [
    { name: 'Business', href: '/dictionary?category=Business' },
    { name: 'Medical', href: '/dictionary?category=Medical' },
    { name: 'Legal', href: '/dictionary?category=Legal' },
    { name: 'Science', href: '/dictionary?category=Science' },
    { name: 'Literature', href: '/dictionary?category=Literature' },
    { name: 'Philosophy', href: '/dictionary?category=Philosophy' },
    { name: 'Arts', href: '/dictionary?category=Arts' },
    { name: 'Psychology', href: '/dictionary?category=Psychology' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap.xml' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/bestvocabulary' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/bestvocabulary' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@bestvocabulary8362' },
  { name: 'Email', icon: Mail, href: 'mailto:bestvocabularyramblerrana@gmail.com' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/bv.png"
                alt="Best Vocabulary"
                width={56}
                height={56}
                className="w-12 h-12 rounded-xl shadow-md"
                quality={100}
              />
              <span className="font-bold text-xl tracking-tight">Best Vocabulary</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">
              Master the art of choosing words. AI-powered vocabulary learning with definitions, etymology, mnemonics, and curated collections.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                    title={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Features</h3>
            <ul className="space-y-2.5">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2.5">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Best Vocabulary. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Sitemap
              </Link>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for word lovers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
