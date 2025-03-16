

export async function getWordOfDay(params = {}) {

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing! Check your .env.local file.");
    }

    const url = `${baseUrl}/api/v1/word-of-the-day`;

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
