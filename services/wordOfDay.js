export async function getWordOfDay() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      console.error("Base URL is missing! Check your .env.local file.");
      return null;
    }

    const url = `${baseUrl}/api/v1/word-of-the-day`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour, revalidate
    });

    if (!response.ok) {
      console.error("Failed to fetch word of the day:", response.status);
      return null;
    }

    const result = await response.json();
    
    // API returns { success: true, data: wordObject, message: "..." }
    if (result.success && result.data) {
      return result.data;
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching word of the day:", error);
    return null;
  }
}

export async function getWodHistory(limit = 7) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      return [];
    }

    const url = `${baseUrl}/api/v1/word-of-the-day/history?limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching WOD history:", error);
    return [];
  }
}
