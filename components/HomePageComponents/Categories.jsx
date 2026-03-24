import Link from 'next/link';
import { ArrowUpRight, FolderOpen, Briefcase, Stethoscope, Scale, Atom, Palette, BookMarked } from 'lucide-react';

const categories = [
  { name: 'Business', icon: Briefcase },
  { name: 'Medical', icon: Stethoscope },
  { name: 'Legal', icon: Scale },
  { name: 'Science', icon: Atom },
  { name: 'Arts', icon: Palette },
  { name: 'Literature', icon: BookMarked },
];

export default async function Categories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
  let countsByCategory = new Map();

  if (baseUrl) {
    try {
      const names = categories.map((c) => c.name).join(',');
      const res = await fetch(
        `${baseUrl}/api/v1/words/category-counts?names=${encodeURIComponent(names)}`,
        { cache: 'no-store' }
      );
      const json = await res.json();
      const counts = json?.data || [];
      countsByCategory = new Map(counts.map((c) => [String(c.category).toLowerCase(), c.count]));
    } catch (_) {
      // If backend fails, fall back to showing 0.
      countsByCategory = new Map();
    }
  }

  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] -translate-y-1/2 bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
            <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Categories
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Browse by topic
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore specialized vocabulary across different fields and disciplines
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const count = countsByCategory.get(category.name.toLowerCase()) || 0;
            return (
              <Link
                key={index}
                href={`/dictionary?category=${category.name.toLowerCase()}`}
                className="group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 min-w-0"
              >
                <div className="flex items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{count.toLocaleString()} words</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0 -translate-y-1 group-hover:translate-y-0" />
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
}
