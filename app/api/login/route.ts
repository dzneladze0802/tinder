import { ACCESS_TOKEN } from "@/constants";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const responseFromApi = await fetch(`${process.env.AUTH_API}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const dataFromApi = await responseFromApi.json();

    if (dataFromApi.accessToken) {
      cookies().set(ACCESS_TOKEN, dataFromApi?.accessToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      });

      return new Response(
        JSON.stringify({
          statusCode: 200,
          message: "login conducted successfuly",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        statusCode: 401,
        message: "Wrong credentials",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
