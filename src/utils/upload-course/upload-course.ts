const uploadCourse = async (
  url: string,
  accessToken: string,
  requestData: any
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
