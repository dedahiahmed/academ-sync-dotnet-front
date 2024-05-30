export async function POST(request: Request): Promise<Response> {
  try {
    const url = process.env.SIGN_IN || "";
    const requestData = await request.json();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type header
      },
      body: JSON.stringify(requestData), // Pass the JSON data directly
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Parse the JSON body if it's present
    const responseBody = await response.json();
    const { access_token } = responseBody;

    // Set the access_token in cookies
    const cookies = `access_token=${access_token}; Path=/; HttpOnly; SameSite=Strict`;

    // Log the response details
    const logResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: Array.from(response.headers.entries()).reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {}
      ),
      body: responseBody,
    };
    console.log(JSON.stringify(logResponse, null, 2));

    return new Response(JSON.stringify(responseBody), {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        "Set-Cookie": cookies,
      },
    });
  } catch (error) {
    // Log and handle any other errors
    console.log("Error in POST function:", error);
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
