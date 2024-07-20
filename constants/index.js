
export const sidebarLinks = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/words",
    label: "Words",
  },
  {
    route: "/trendingwords",
    label: "Trending Words",
  },
  {
    route: "/dictionary",
    label: "Dictionary",
  }
];


export const filterItems = {
  ByGrades: {
    elementary: [
      { label: 'Basic Vocabulary', icon: 'pi pi-sparkles', value: 'basic' },
      { label: 'Mathematics Vocabulary', icon: 'pi pi-chart-bar', value: 'mathematics' },
      { label: 'Science Vocabulary', icon: 'pi pi-flask', value: 'science' },
      { label: 'Language Vocabulary', icon: 'pi pi-flag-en', value: 'language' },
    ],
    MiddleSchool: [
      { label: 'Advanced Vocabulary', icon: 'pi pi-globe', value: 'advanced' },
      { label: 'History Vocabulary', icon: 'pi pi-hourglass', value: 'history' },
      { label: 'Geography Vocabulary', icon: 'pi pi-map-marker', value: 'geography' },
      { label: 'Music Vocabulary', icon: 'pi pi-music', value: 'music' },
    ],
    HighSchool: [
      { label: 'Business Vocabulary', icon: 'pi pi-briefcase', value: 'business' },
      { label: 'Academic Vocabulary', icon: 'pi pi-book', value: 'academic' },
      { label: 'Technology Vocabulary', icon: 'pi pi-desktop', value: 'technical' },
      { label: 'Art Vocabulary', icon: 'pi pi-palette', value: 'art' },
    ],
    CollegeUniversity: [
      { label: 'Medical Vocabulary', icon: 'pi pi-heart', value: 'medical' },
      { label: 'Legal Vocabulary', icon: 'pi pi-file', value: 'legal' },
      { label: 'Communication Vocabulary', icon: 'pi pi-comments', value: 'communication' },
      { label: 'Economics Vocabulary', icon: 'pi pi-money-bill', value: 'economics' },
    ],
  },
  BySubjects: {
    languageLiterature: [
      { label: 'Literature Vocabulary', icon: 'pi pi-book-open', value: 'literature' },
      { label: 'Writing Vocabulary', icon: 'pi pi-pencil', value: 'writing' },
      { label: 'Poetry Vocabulary', icon: 'pi pi-feather', value: 'poetry' },
    ],
    ScienceTechnology: [
      { label: 'Technical Vocabulary', icon: 'pi pi-laptop', value: 'technical' },
      { label: 'Computer Science Vocabulary', icon: 'pi pi-desktop', value: 'computer-science' },
      { label: 'Engineering Vocabulary', icon: 'pi pi-tools', value: 'engineering' },
    ],
    SocialSciences: [
      { label: 'Political Science Vocabulary', icon: 'pi pi-flag', value: 'political-science' },
      { label: 'Psychology Vocabulary', icon: 'pi pi-brain', value: 'psychology' },
      { label: 'Sociology Vocabulary', icon: 'pi pi-users', value: 'sociology' },
      // Add more social sciences categories
    ],
    ArtsHumanities: [ 
      { label: 'Art Vocabulary', icon: 'pi pi-palette', value: 'art' },
      { label: 'Music Theory', icon: 'pi pi-music', value: 'music-theory' },
      { label: 'Philosophy Vocabulary', icon: 'pi pi-lightbulb', value: 'philosophy' },
      // Add more arts and humanities categories
    ],
    ProfessionalVocational: [
      { label: 'Business Management', icon: 'pi pi-briefcase', value: 'business-management' },
      { label: 'Medical Specialties', icon: 'pi pi-user-md', value: 'medical-specialties' },
      { label: 'Legal System Vocabulary', icon: 'pi pi-balance-scale', value: 'legal-system' },
      // Add more professional and vocational categories
    ],
  },
};

