export const createUser = async (data: user): Promise<number | null> => {
  try {
    const RequestData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(RequestData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const responseData = await response.json();
    const userId = responseData.data[0]?.id || null; // Extracting the id from the response

    return userId;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
