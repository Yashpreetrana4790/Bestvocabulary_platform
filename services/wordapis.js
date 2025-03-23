export async function getWords(params = {}) {
  const { page = 1, limit = 12, search, difficulty, length, startsWith } = params;

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
      throw new Error("Base URL is missing! Check your .env.local file");
    }

    const url = `${baseUrl}/api/v1/words/words/${params?.word}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}