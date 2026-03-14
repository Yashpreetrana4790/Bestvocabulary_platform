'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Stethoscope, Scale, Atom, Palette, BookMarked, 
  GraduationCap, Globe, Code, Calculator, Music, Film,
  Utensils, Plane, Heart, Dumbbell, Leaf, Building2,
  Camera, Gamepad2, ShoppingBag, Mic, PenTool, Trophy,
  ArrowRight, Sparkles, TrendingUp, Clock, Star, Search,
  ChevronDown, ChevronUp, Flame, Zap, Award, Target,
  Lightbulb, Compass, Rocket, Brain, Beaker, Landmark,
  Anchor, Cpu, Wifi, Shield, Database, Cloud
} from 'lucide-react';

const categoryGroups = [
  {
    name: 'Popular',
    icon: Flame,
    color: 'rose',
    categories: [
      { name: 'Business', icon: Briefcase, count: '500+', hot: true },
      { name: 'Medical', icon: Stethoscope, count: '400+', hot: true },
      { name: 'Legal', icon: Scale, count: '350+' },
      { name: 'Technology', icon: Code, count: '550+', hot: true },
      { name: 'Science', icon: Atom, count: '600+' },
      { name: 'Psychology', icon: Brain, count: '310+' },
    ]
  },
  {
    name: 'Arts & Culture',
    icon: Palette,
    color: 'purple',
    categories: [
      { name: 'Arts & Design', icon: Palette, count: '300+' },
      { name: 'Literature', icon: BookMarked, count: '450+' },
      { name: 'Music', icon: Music, count: '180+' },
      { name: 'Film & Cinema', icon: Film, count: '220+' },
      { name: 'Theatre & Drama', icon: Film, count: '165+' },
      { name: 'Photography', icon: Camera, count: '140+' },
      { name: 'Dance', icon: Music, count: '95+' },
      { name: 'Sculpture', icon: Palette, count: '85+' },
      { name: 'Poetry', icon: PenTool, count: '165+' },
      { name: 'Creative Writing', icon: PenTool, count: '290+' },
    ]
  },
  {
    name: 'Science & Academia',
    icon: Beaker,
    color: 'blue',
    categories: [
      { name: 'Physics', icon: Atom, count: '320+' },
      { name: 'Chemistry', icon: Beaker, count: '290+' },
      { name: 'Biology', icon: Leaf, count: '380+' },
      { name: 'Mathematics', icon: Calculator, count: '200+' },
      { name: 'Astronomy', icon: Globe, count: '175+' },
      { name: 'Geology', icon: Globe, count: '145+' },
      { name: 'Philosophy', icon: Lightbulb, count: '260+' },
      { name: 'History', icon: BookMarked, count: '420+' },
      { name: 'Sociology', icon: Heart, count: '195+' },
      { name: 'Anthropology', icon: Globe, count: '165+' },
      { name: 'Archaeology', icon: Compass, count: '135+' },
      { name: 'Linguistics', icon: BookMarked, count: '225+' },
      { name: 'Education', icon: GraduationCap, count: '280+' },
    ]
  },
  {
    name: 'Technology & Computing',
    icon: Cpu,
    color: 'cyan',
    categories: [
      { name: 'Programming', icon: Code, count: '380+' },
      { name: 'Artificial Intelligence', icon: Brain, count: '240+', new: true },
      { name: 'Machine Learning', icon: Cpu, count: '195+', new: true },
      { name: 'Cybersecurity', icon: Shield, count: '185+' },
      { name: 'Data Science', icon: Database, count: '210+' },
      { name: 'Cloud Computing', icon: Cloud, count: '165+', new: true },
      { name: 'Blockchain', icon: Code, count: '120+' },
      { name: 'Robotics', icon: Cpu, count: '145+' },
      { name: 'Networking', icon: Wifi, count: '175+' },
      { name: 'Web Development', icon: Code, count: '285+' },
      { name: 'Mobile Development', icon: Code, count: '195+' },
      { name: 'DevOps', icon: Code, count: '145+' },
    ]
  },
  {
    name: 'Business & Finance',
    icon: Briefcase,
    color: 'emerald',
    categories: [
      { name: 'Finance', icon: Briefcase, count: '340+' },
      { name: 'Marketing', icon: Target, count: '280+' },
      { name: 'Management', icon: Briefcase, count: '245+' },
      { name: 'Accounting', icon: Calculator, count: '195+' },
      { name: 'Economics', icon: TrendingUp, count: '310+' },
      { name: 'Real Estate', icon: Building2, count: '165+' },
      { name: 'Human Resources', icon: Heart, count: '175+' },
      { name: 'Entrepreneurship', icon: Rocket, count: '155+' },
      { name: 'Investing', icon: TrendingUp, count: '225+' },
      { name: 'E-commerce', icon: ShoppingBag, count: '185+' },
      { name: 'Consulting', icon: Lightbulb, count: '145+' },
    ]
  },
  {
    name: 'Healthcare & Medicine',
    icon: Stethoscope,
    color: 'rose',
    categories: [
      { name: 'Anatomy', icon: Stethoscope, count: '285+' },
      { name: 'Pharmacy', icon: Stethoscope, count: '265+' },
      { name: 'Surgery', icon: Stethoscope, count: '230+' },
      { name: 'Nursing', icon: Heart, count: '195+' },
      { name: 'Cardiology', icon: Heart, count: '165+' },
      { name: 'Neurology', icon: Brain, count: '195+' },
      { name: 'Dermatology', icon: Stethoscope, count: '125+' },
      { name: 'Pediatrics', icon: Heart, count: '155+' },
      { name: 'Oncology', icon: Stethoscope, count: '175+' },
      { name: 'Psychiatry', icon: Brain, count: '185+' },
      { name: 'Dentistry', icon: Stethoscope, count: '145+' },
      { name: 'Veterinary', icon: Heart, count: '175+' },
      { name: 'Nutrition', icon: Utensils, count: '220+' },
      { name: 'Public Health', icon: Heart, count: '165+' },
    ]
  },
  {
    name: 'Sports & Fitness',
    icon: Trophy,
    color: 'orange',
    categories: [
      { name: 'Football', icon: Trophy, count: '165+' },
      { name: 'Basketball', icon: Trophy, count: '145+' },
      { name: 'Cricket', icon: Trophy, count: '155+' },
      { name: 'Tennis', icon: Trophy, count: '125+' },
      { name: 'Golf', icon: Trophy, count: '135+' },
      { name: 'Swimming', icon: Dumbbell, count: '95+' },
      { name: 'Boxing', icon: Trophy, count: '115+' },
      { name: 'Olympics', icon: Award, count: '185+' },
      { name: 'Motorsports', icon: Zap, count: '145+' },
      { name: 'Fitness', icon: Dumbbell, count: '185+' },
      { name: 'Yoga', icon: Heart, count: '95+' },
      { name: 'Martial Arts', icon: Trophy, count: '175+' },
      { name: 'Athletics', icon: Trophy, count: '155+' },
    ]
  },
  {
    name: 'Nature & Environment',
    icon: Leaf,
    color: 'green',
    categories: [
      { name: 'Nature', icon: Leaf, count: '340+' },
      { name: 'Marine Biology', icon: Anchor, count: '195+' },
      { name: 'Ecology', icon: Leaf, count: '165+' },
      { name: 'Climate', icon: Globe, count: '145+' },
      { name: 'Botany', icon: Leaf, count: '225+' },
      { name: 'Zoology', icon: Leaf, count: '265+' },
      { name: 'Conservation', icon: Leaf, count: '135+' },
      { name: 'Oceanography', icon: Anchor, count: '125+' },
      { name: 'Forestry', icon: Leaf, count: '115+' },
      { name: 'Wildlife', icon: Leaf, count: '185+' },
      { name: 'Sustainability', icon: Leaf, count: '155+', new: true },
    ]
  },
  {
    name: 'Lifestyle & Living',
    icon: Heart,
    color: 'pink',
    categories: [
      { name: 'Food & Cuisine', icon: Utensils, count: '250+' },
      { name: 'Travel', icon: Plane, count: '190+' },
      { name: 'Fashion', icon: ShoppingBag, count: '210+' },
      { name: 'Beauty', icon: ShoppingBag, count: '165+' },
      { name: 'Wine & Spirits', icon: Utensils, count: '145+' },
      { name: 'Gardening', icon: Leaf, count: '175+' },
      { name: 'Interior Design', icon: Building2, count: '155+' },
      { name: 'Parenting', icon: Heart, count: '135+' },
      { name: 'Relationships', icon: Heart, count: '125+' },
      { name: 'Meditation', icon: Heart, count: '85+' },
      { name: 'Wellness', icon: Heart, count: '175+' },
    ]
  },
  {
    name: 'Communication & Media',
    icon: Mic,
    color: 'violet',
    categories: [
      { name: 'Journalism', icon: Mic, count: '195+' },
      { name: 'Public Relations', icon: Mic, count: '165+' },
      { name: 'Advertising', icon: Mic, count: '185+' },
      { name: 'Broadcasting', icon: Mic, count: '145+' },
      { name: 'Social Media', icon: Globe, count: '175+' },
      { name: 'Publishing', icon: BookMarked, count: '155+' },
      { name: 'Podcasting', icon: Mic, count: '95+', new: true },
      { name: 'Content Creation', icon: PenTool, count: '165+', new: true },
    ]
  },
  {
    name: 'Government & Law',
    icon: Landmark,
    color: 'amber',
    categories: [
      { name: 'Politics', icon: Landmark, count: '275+' },
      { name: 'Diplomacy', icon: Globe, count: '145+' },
      { name: 'Criminal Law', icon: Scale, count: '185+' },
      { name: 'Civil Law', icon: Scale, count: '165+' },
      { name: 'Constitutional Law', icon: Landmark, count: '145+' },
      { name: 'International Law', icon: Globe, count: '135+' },
      { name: 'Military', icon: Shield, count: '245+' },
      { name: 'Public Policy', icon: Landmark, count: '155+' },
    ]
  },
  {
    name: 'Engineering & Industry',
    icon: Code,
    color: 'slate',
    categories: [
      { name: 'Engineering', icon: Code, count: '345+' },
      { name: 'Architecture', icon: Building2, count: '160+' },
      { name: 'Manufacturing', icon: Code, count: '195+' },
      { name: 'Aviation', icon: Plane, count: '185+' },
      { name: 'Maritime', icon: Anchor, count: '165+' },
      { name: 'Automotive', icon: Zap, count: '175+' },
      { name: 'Civil Engineering', icon: Building2, count: '165+' },
      { name: 'Electrical', icon: Zap, count: '185+' },
      { name: 'Mechanical', icon: Code, count: '195+' },
      { name: 'Chemical Engineering', icon: Beaker, count: '145+' },
    ]
  },
  {
    name: 'Gaming & Entertainment',
    icon: Gamepad2,
    color: 'indigo',
    categories: [
      { name: 'Gaming', icon: Gamepad2, count: '230+' },
      { name: 'Esports', icon: Trophy, count: '145+', new: true },
      { name: 'Game Development', icon: Code, count: '175+' },
      { name: 'Virtual Reality', icon: Gamepad2, count: '125+', new: true },
      { name: 'Animation', icon: Film, count: '175+' },
      { name: 'Comics', icon: PenTool, count: '115+' },
      { name: 'Board Games', icon: Gamepad2, count: '85+' },
    ]
  },
  {
    name: 'Religion & Spirituality',
    icon: Star,
    color: 'yellow',
    categories: [
      { name: 'Religion', icon: Star, count: '295+' },
      { name: 'Mythology', icon: BookMarked, count: '185+' },
      { name: 'Spirituality', icon: Heart, count: '145+' },
      { name: 'Philosophy of Religion', icon: Lightbulb, count: '125+' },
      { name: 'World Religions', icon: Globe, count: '215+' },
      { name: 'Theology', icon: BookMarked, count: '175+' },
    ]
  },
  {
    name: 'Miscellaneous',
    icon: Compass,
    color: 'gray',
    categories: [
      { name: 'Geography', icon: Globe, count: '320+' },
      { name: 'Agriculture', icon: Leaf, count: '195+' },
      { name: 'Textiles', icon: ShoppingBag, count: '125+' },
      { name: 'Ceramics', icon: Palette, count: '95+' },
      { name: 'Jewelry', icon: ShoppingBag, count: '115+' },
      { name: 'Astrology', icon: Star, count: '85+' },
      { name: 'Cryptography', icon: Shield, count: '95+' },
      { name: 'Graphic Design', icon: Palette, count: '195+' },
      { name: 'Illustration', icon: PenTool, count: '155+' },
      { name: 'Screenwriting', icon: Film, count: '145+' },
    ]
  },
];

const trendingWords = [
  { word: 'Ephemeral', category: 'Literature', views: '2.4k' },
  { word: 'Synergy', category: 'Business', views: '1.8k' },
  { word: 'Algorithm', category: 'Technology', views: '3.1k' },
  { word: 'Empathy', category: 'Psychology', views: '1.5k' },
  { word: 'Serendipity', category: 'Literature', views: '2.1k' },
  { word: 'Paradigm', category: 'Science', views: '1.2k' },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState(['Popular']);

  const totalCategories = useMemo(() => {
    return categoryGroups.reduce((acc, group) => acc + group.categories.length, 0);
  }, []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return categoryGroups;
    
    const query = searchQuery.toLowerCase();
    return categoryGroups.map(group => ({
      ...group,
      categories: group.categories.filter(cat => 
        cat.name.toLowerCase().includes(query)
      )
    })).filter(group => group.categories.length > 0);
  }, [searchQuery]);

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => 
      prev.includes(groupName)
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  const expandAll = () => {
    setExpandedGroups(categoryGroups.map(g => g.name));
  };

  const collapseAll = () => {
    setExpandedGroups([]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/20" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] bg-primary/15" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              {totalCategories}+ Categories
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Explore Word Categories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover specialized vocabulary organized by topics. Perfect for targeted learning and building expertise in any field.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-foreground">{totalCategories}+</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Words</p>
            </div>
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Definitions</p>
            </div>
            <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-foreground">Daily</p>
              <p className="text-sm text-muted-foreground">Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Categories'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Expand all
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Category Groups */}
        <div className="space-y-4">
          {filteredGroups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroups.includes(group.name);
            
            return (
              <div key={group.name} className="rounded-2xl border bg-card overflow-hidden">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-${group.color}-500/10 flex items-center justify-center`}>
                      <GroupIcon className={`h-5 w-5 text-${group.color}-600 dark:text-${group.color}-400`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.categories.length} categories</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Categories Grid */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-4">
                      {group.categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                          <Link
                            key={index}
                            href={`/dictionary?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/80 transition-all duration-200"
                          >
                            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                  {category.name}
                                </span>
                                {category.hot && (
                                  <Flame className="h-3 w-3 text-orange-500 shrink-0" />
                                )}
                                {category.new && (
                                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{category.count}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No categories found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Trending Words Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 border-t">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Trending Words</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trendingWords.map((item, index) => (
            <Link
              key={index}
              href={`/word/${item.word.toLowerCase()}`}
              className="group p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all text-center"
            >
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.word}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
              <p className="text-xs text-primary mt-1">{item.views} views</p>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="p-8 md:p-12 rounded-3xl border bg-gradient-to-br from-primary/5 to-card text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Not sure where to start?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Try our AI-powered search to find words by meaning, or explore our Word of the Day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/search">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                <Sparkles className="h-4 w-4" />
                AI Search
              </button>
            </Link>
            <Link href="/wordofday">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border bg-card font-medium hover:bg-muted transition-colors">
                <Clock className="h-4 w-4" />
                Word of the Day
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
