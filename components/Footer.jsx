import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Dictionary', href: '/dictionary' },
    { name: 'Word of the Day', href: '/wordofday' },
    { name: 'Categories', href: '/categories' },
    { name: 'AI Search', href: '/search' },
  ],
  resources: [
    { name: 'Random Word', href: '/random' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Flashcards', href: '/flashcards' },
    { name: 'Bookmarks', href: '/bookmarks' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/bestvocabulary' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/bestvocabulary' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/bestvocabulary' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@bestvocabulary.com' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/bv.png"
                alt="Best Vocabulary"
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl shadow-md"
                quality={100}
              />
              <span className="font-bold text-xl tracking-tight">Best Vocabulary</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Expand your vocabulary with AI-powered search and curated word collections.
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

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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
            <ul className="space-y-3">
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Best Vocabulary. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for word lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
