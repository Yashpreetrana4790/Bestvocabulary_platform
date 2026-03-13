import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderOpen, Briefcase, Stethoscope, Scale, Atom, Palette, BookMarked } from 'lucide-react';

const categories = [
  { name: 'Business', count: '500+', icon: Briefcase },
  { name: 'Medical', count: '400+', icon: Stethoscope },
  { name: 'Legal', count: '350+', icon: Scale },
  { name: 'Science', count: '600+', icon: Atom },
  { name: 'Arts', count: '300+', icon: Palette },
  { name: 'Literature', count: '450+', icon: BookMarked },
];

const Categories = () => {
  return (
    <section className="py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] -translate-y-1/2 bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <FolderOpen className="h-4 w-4" />
            Categories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by topic
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore specialized vocabulary across different fields and disciplines
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={`/dictionary?category=${category.name.toLowerCase()}`}
                className="group relative p-6 rounded-2xl border bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} words</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/dictionary"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            View all categories
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
