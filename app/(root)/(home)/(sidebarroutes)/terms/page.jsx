import React from 'react';
import Link from 'next/link';
import { FileText, Shield, Users, AlertCircle, Scale, BookOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Best Vocabulary. Read our terms and conditions for using our vocabulary learning platform.',
  keywords: ['terms of service', 'terms and conditions', 'best vocabulary terms', 'user agreement'],
  openGraph: {
    title: 'Terms of Service | Best Vocabulary',
    description: 'Read our Terms of Service to understand the rules and guidelines for using Best Vocabulary.',
  },
};

const sections = [
  {
    id: 'acceptance',
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using Best Vocabulary ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.',
      'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the modified Terms.',
      'These Terms apply to all visitors, users, and others who access or use the Service.',
    ],
  },
  {
    id: 'description',
    icon: BookOpen,
    title: '2. Description of Service',
    content: [
      'Best Vocabulary is a free online vocabulary learning platform that provides:',
    ],
    list: [
      'Dictionary and word definitions',
      'AI-powered semantic search',
      'Vocabulary quizzes and flashcards',
      'Word of the Day feature',
      'Bookmarking and progress tracking',
      'Etymology and word origin information',
      'Category-based word exploration',
    ],
    additionalContent: [
      'The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.',
    ],
  },
  {
    id: 'accounts',
    icon: Users,
    title: '3. User Accounts',
    content: [
      'Some features of the Service may require you to create an account. When creating an account, you agree to:',
    ],
    list: [
      'Provide accurate, current, and complete information',
      'Maintain and promptly update your account information',
      'Keep your password secure and confidential',
      'Accept responsibility for all activities under your account',
      'Notify us immediately of any unauthorized access',
    ],
    additionalContent: [
      'We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our sole discretion.',
    ],
  },
  {
    id: 'conduct',
    icon: Shield,
    title: '4. User Conduct',
    content: [
      'When using the Service, you agree NOT to:',
    ],
    list: [
      'Violate any applicable laws or regulations',
      'Infringe upon the rights of others',
      'Attempt to gain unauthorized access to the Service or its systems',
      'Use automated systems (bots, scrapers) without permission',
      'Interfere with or disrupt the Service',
      'Upload malicious code or harmful content',
      'Impersonate others or misrepresent your affiliation',
      'Use the Service for commercial purposes without authorization',
      'Collect or harvest user data without consent',
    ],
  },
  {
    id: 'intellectual',
    icon: Scale,
    title: '5. Intellectual Property',
    content: [
      'All content on Best Vocabulary, including but not limited to text, graphics, logos, icons, images, audio, and software, is the property of Best Vocabulary or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.',
      'You may use the Service for personal, non-commercial purposes only. You may not copy, modify, distribute, sell, or lease any part of the Service or its content without our express written permission.',
      'Word definitions and linguistic data are compiled from various sources and are provided for educational purposes. We strive for accuracy but do not guarantee the completeness or correctness of all information.',
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    title: '6. Privacy',
    content: [
      'Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.',
      'By using the Service, you consent to the collection and use of information as described in our Privacy Policy.',
    ],
    link: {
      text: 'Read our Privacy Policy',
      href: '/privacy',
    },
  },
  {
    id: 'disclaimers',
    icon: AlertCircle,
    title: '7. Disclaimers',
    content: [
      'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:',
    ],
    list: [
      'Implied warranties of merchantability',
      'Fitness for a particular purpose',
      'Non-infringement',
      'Accuracy or reliability of content',
      'Uninterrupted or error-free operation',
    ],
    additionalContent: [
      'We do not warrant that the Service will meet your requirements or that any errors will be corrected. You use the Service at your own risk.',
    ],
  },
  {
    id: 'limitation',
    icon: Scale,
    title: '8. Limitation of Liability',
    content: [
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, BEST VOCABULARY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:',
    ],
    list: [
      'Loss of profits, data, or goodwill',
      'Service interruption or computer damage',
      'Cost of substitute services',
      'Any damages arising from your use of the Service',
    ],
    additionalContent: [
      'Our total liability for any claims arising from your use of the Service shall not exceed the amount you paid us (if any) in the past 12 months.',
    ],
  },
  {
    id: 'indemnification',
    icon: Shield,
    title: '9. Indemnification',
    content: [
      'You agree to indemnify, defend, and hold harmless Best Vocabulary, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys\' fees) arising from:',
    ],
    list: [
      'Your use of the Service',
      'Your violation of these Terms',
      'Your violation of any rights of third parties',
      'Your content or submissions to the Service',
    ],
  },
  {
    id: 'termination',
    icon: AlertCircle,
    title: '10. Termination',
    content: [
      'We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.',
      'Upon termination, your right to use the Service will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.',
    ],
  },
  {
    id: 'governing',
    icon: Scale,
    title: '11. Governing Law',
    content: [
      'These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.',
      'Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration or in the courts of competent jurisdiction.',
    ],
  },
  {
    id: 'changes',
    icon: FileText,
    title: '12. Changes to Terms',
    content: [
      'We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on the Service or sending an email.',
      'Your continued use of the Service after changes are posted constitutes your acceptance of the modified Terms. We encourage you to review these Terms periodically.',
    ],
  },
];

export default function TermsPage() {
  const lastUpdated = 'March 14, 2026';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <FileText className="h-4 w-4" />
            Legal
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Terms of Service
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Please read these terms carefully before using Best Vocabulary. By using our service, 
            you agree to be bound by these terms and conditions.
          </p>

          <p className="text-sm text-muted-foreground">
            Last updated: <span className="font-medium text-foreground">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 border-y bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold text-foreground mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-background border hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
              >
                {section.title.replace(/^\d+\.\s*/, '')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="pl-14 space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    
                    {section.list && (
                      <ul className="space-y-2 my-4">
                        {section.list.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.additionalContent?.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {section.link && (
                      <Link 
                        href={section.link.href}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-2"
                      >
                        {section.link.text} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 md:p-12 rounded-3xl border bg-card shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Questions about these terms?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              If you have any questions about our Terms of Service, please don&apos;t hesitate to contact us.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="mailto:bestvocabularyramblerrana@gmail.com">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Mail className="h-4 w-4" /> Contact Us
                </Button>
              </Link>
              <Link href="/privacy">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                  <Shield className="h-4 w-4" /> Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <section className="py-8 px-4 text-center">
        <a 
          href="#" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ↑ Back to top
        </a>
      </section>
    </div>
  );
}
