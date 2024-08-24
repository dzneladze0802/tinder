export async function POST(request: Request) {
  try {
    const body = await request.json();

    const responseFromApi = await fetch(`${process.env.AUTH_API}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const dataFromApi = await responseFromApi.json();

    return new Response(JSON.stringify(dataFromApi), {
      status: dataFromApi?.statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
