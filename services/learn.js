export async function fetchLearn(params = {}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (!baseUrl) {
      throw new Error("Base URL is missing! Check your .env.local file.");
    }


    const url = `${baseUrl}/api/v1/words/words/random`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "rr")
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {

  }

}