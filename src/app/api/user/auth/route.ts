import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function POST(request: Request) {
  const AuthTokenBody = z.object({
    token: z.string()
  })

  type AuthTokenResponse = {
    userData: {
      name: string;
      email: string;
      avatarUrl: string;  
    }
    token: string;
  }

  try {

    const { token } = AuthTokenBody.parse(await request.json());
    

    return NextResponse.json(response)

  } catch (error:any) {
    console.log(`error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }

}