export async function getWords(params = {}) {
  const { 
    page = 1, 
    limit = 12, 
    search, 
    difficulty, 
    length, 
    startsWith,
    category,
    pos,
    tone,
    hasEtymology,
    hasPhrases,
    sortBy,
    sortOrder
  } = params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing! Check your .env.local file.");
    }

    // Construct the query params
    let queryParams = new URLSearchParams({
      page,
      limit,
    });

    if (search) queryParams.append("search", search);
    if (difficulty) queryParams.append("difficulty", difficulty);
    if (length) queryParams.append("length", length);
    if (startsWith) queryParams.append("startsWith", startsWith);
    if (category) queryParams.append("category", category);
    if (pos) queryParams.append("pos", pos);
    if (tone) queryParams.append("tone", tone);
    if (hasEtymology) queryParams.append("hasEtymology", hasEtymology);
    if (hasPhrases) queryParams.append("hasPhrases", hasPhrases);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (sortOrder) queryParams.append("sortOrder", sortOrder);

    const url = `${baseUrl}/api/v1/words/words?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched words:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return null;
  }
}



export async function getSingleWord(params = {}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      console.error("getSingleWord: Base URL is missing!");
      throw new Error("Base URL is missing! Check your .env.local file");
    }

    const wordToFetch = params?.word;
    console.log("getSingleWord: Fetching word:", wordToFetch);
    
    const url = `${baseUrl}/api/v1/words/words/${wordToFetch}`;
    console.log("getSingleWord: Full URL:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    
    console.log("getSingleWord: Response status:", response.status, response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("getSingleWord: Error response:", errorText);
      return null;
    }
    
    const data = await response.json();
    console.log("getSingleWord: Got data for word:", data?.data?.word || data?.word);
    return data;
  } catch (error) {
    console.error("getSingleWord: Error fetching word:", error);
    return null;
  }
}

/**
 * Semantic search - search words by meaning using AI embeddings
 * @param {string} query - Natural language search query
 * @param {number} limit - Max results (default 10)
 * @returns {Promise<Array<{ word: Object, score: number }>>}
 */
export async function semanticSearchWords(query, limit = 10) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing! Check your .env.local file");
    }

    if (!query || !query.trim()) {
      return [];
    }

    const queryParams = new URLSearchParams({
      q: query.trim(),
      limit: String(limit),
    });

    const url = `${baseUrl}/api/v1/words/semantic-search?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Semantic search failed:", error);
    return [];
  }
}

/**
 * Quick search - lightweight search for autocomplete suggestions
 * @param {string} query - Search term
 * @param {number} limit - Max results
 * @returns {Promise<Array>}
 */
export async function quickSearch(query, limit = 5) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing!");
    }

    if (!query || query.trim().length < 2) {
      return [];
    }

    const queryParams = new URLSearchParams({
      q: query.trim(),
      limit: String(limit),
    });

    const url = `${baseUrl}/api/v1/words/search?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Quick search failed:", error);
    return [];
  }
}

/**
 * Get a random word from the database
 * @returns {Promise<Object|null>}
 */
export async function getRandomWord() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing!");
    }

    const url = `${baseUrl}/api/v1/words/random`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Failed to fetch random word:", error);
    return null;
  }
}

/**
 * Get Word of the Day
 * @returns {Promise<Object|null>}
 */
export async function getWordOfDay() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing!");
    }

    const url = `${baseUrl}/api/v1/wod`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Failed to fetch word of the day:", error);
    return null;
  }
}