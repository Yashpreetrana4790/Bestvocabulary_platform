"use server";

import config from "../config";


export const AddNewWord = async (wordData) => {

  console.log(wordData, "wordData")
  try {


    const response = await fetch(`${config.baseUrl}/api/v1/admin/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wordData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, "data"); // Log the received data
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
