const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestvocabulary.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function getAllWords() {
  try {
    const response = await fetch(`${API_URL}/words?limit=10000`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.words || [];
  } catch (error) {
    console.error('Error fetching words for sitemap:', error);
    return [];
  }
}

export default async function sitemap() {
  const words = await getAllWords();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/dictionary`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/wordofday`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/random`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/flashcards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const wordPages = words.map((word) => ({
    url: `${SITE_URL}/word/${encodeURIComponent(word.word)}`,
    lastModified: word.updatedAt ? new Date(word.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...wordPages];
}
