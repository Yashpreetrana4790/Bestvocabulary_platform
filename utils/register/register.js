import config from '../config';

export async function getData(userData) {
  try {
    const res = await fetch(`${config.baseUrl}/api/v1/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }


    const data = await res.json();
    console.log(data, "daata")
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}