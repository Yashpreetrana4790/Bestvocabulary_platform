
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

];


export const filterItems = {
  Bygrades: {
    Pro: [
      { label: 'Pro Vocabulary', icon: 'pi pi-sparkles', value: 'pro' },
    ],
    Elementary: [
      {
        label: 'Basic Vocabulary', icon: 'pi pi-star', value: 'basic'
      },
      { label: 'Mathematics Vocabulary', icon: 'pi pi-chart-bar', value: 'mathematics' },
    ],
    MiddleSchool: [
      { label: 'Advanced Vocabulary', icon: 'pi pi-globe', value: 'advanced' },
      { label: 'History Vocabulary', icon: 'pi pi-hourglass', value: 'history' },
      { label: 'Geography Vocabulary', icon: 'pi pi-map-marker', value: 'geography' },
      { label: 'Music Vocabulary', icon: 'pi pi-headphones', value: 'music' },
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
    LanguageLiterature: [
      { label: 'Literature Vocabulary', icon: 'pi pi-book-open', value: 'literature' },
      { label: 'Writing Vocabulary', icon: 'pi pi-pencil', value: 'writing' },
      { label: 'Poetry Vocabulary', icon: 'pi pi-lightbulb', value: 'poetry' },
    ],
    ScienceTechnology: [
      { label: 'Technical Vocabulary', icon: 'pi pi-desktop', value: 'technical' },
      { label: 'Engineering Vocabulary', icon: 'pi  pi-spin pi-cog', value: 'engineering' },
    ],
    SocialSciences: [
      { label: 'Political Science Vocabulary', icon: 'pi pi-flag', value: 'political-science' },
      { label: 'Sociology Vocabulary', icon: 'pi pi-users', value: 'sociology' },
    ],
    ArtsHumanities: [
      { label: 'Art Vocabulary', icon: 'pi pi-palette', value: 'art' },
      { label: 'Music Theory', icon: 'pi pi-headphones', value: 'music-theory' },
      { label: 'Philosophy Vocabulary', icon: 'pi pi-lightbulb', value: 'philosophy' },
    ],
    ProfessionalVocational: [
      { label: 'Business Management', icon: 'pi pi-briefcase', value: 'business-management' },
      { label: 'Medical Specialties', icon: 'pi pi-wave-pulse', value: 'medical-specialties' },
    ],
  },
};


export const filterItemsGrouped = [
  {
    label: 'By Grades',
    items: [
      {
        label: 'Pro',
        options: [
          { label: 'Pro Vocabulary', icon: 'pi pi-sparkles', value: 'pro' },
        ]
      },
      {
        label: 'Elementary',
        options: [
          { label: 'Basic Vocabulary', icon: 'pi pi-star', value: 'basic' },
          { label: 'Mathematics Vocabulary', icon: 'pi pi-chart-bar', value: 'mathematics' },
        ]
      },
      {
        label: 'Middle School',
        options: [
          { label: 'Advanced Vocabulary', icon: 'pi pi-globe', value: 'advanced' },
          { label: 'History Vocabulary', icon: 'pi pi-hourglass', value: 'history' },
          { label: 'Geography Vocabulary', icon: 'pi pi-map-marker', value: 'geography' },
          { label: 'Music Vocabulary', icon: 'pi pi-headphones', value: 'music' },
        ]
      },
      {
        label: 'High School',
        options: [
          { label: 'Business Vocabulary', icon: 'pi pi-briefcase', value: 'business' },
          { label: 'Academic Vocabulary', icon: 'pi pi-book', value: 'academic' },
          { label: 'Technology Vocabulary', icon: 'pi pi-desktop', value: 'technical' },
          { label: 'Art Vocabulary', icon: 'pi pi-palette', value: 'art' },
        ]
      },
      {
        label: 'College/University',
        options: [
          { label: 'Medical Vocabulary', icon: 'pi pi-heart', value: 'medical' },
          { label: 'Legal Vocabulary', icon: 'pi pi-file', value: 'legal' },
          { label: 'Communication Vocabulary', icon: 'pi pi-comments', value: 'communication' },
          { label: 'Economics Vocabulary', icon: 'pi pi-money-bill', value: 'economics' },
        ]
      }
    ]
  },
  {
    label: 'By Subjects',
    items: [
      {
        label: 'Language & Literature',
        options: [
          { label: 'Literature Vocabulary', icon: 'pi pi-book-open', value: 'literature' },
          { label: 'Writing Vocabulary', icon: 'pi pi-pencil', value: 'writing' },
          { label: 'Poetry Vocabulary', icon: 'pi pi-lightbulb', value: 'poetry' },
        ]
      },
      {
        label: 'Science & Technology',
        options: [
          { label: 'Technical Vocabulary', icon: 'pi pi-desktop', value: 'technical' },
          { label: 'Engineering Vocabulary', icon: 'pi pi-spin pi-cog', value: 'engineering' },
        ]
      },
      {
        label: 'Social Sciences',
        options: [
          { label: 'Political Science Vocabulary', icon: 'pi pi-flag', value: 'political-science' },
          { label: 'Sociology Vocabulary', icon: 'pi pi-users', value: 'sociology' },
        ]
      },
      {
        label: 'Arts & Humanities',
        options: [
          { label: 'Art Vocabulary', icon: 'pi pi-palette', value: 'art' },
          { label: 'Music Theory', icon: 'pi pi-headphones', value: 'music-theory' },
          { label: 'Philosophy Vocabulary', icon: 'pi pi-lightbulb', value: 'philosophy' },
        ]
      },
      {
        label: 'Professional & Vocational',
        options: [
          { label: 'Business Management', icon: 'pi pi-briefcase', value: 'business-management' },
          { label: 'Medical Specialties', icon: 'pi pi-wave-pulse', value: 'medical-specialties' },
        ]
      }
    ]
  }
];

