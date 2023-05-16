import { prisma } from "@/lib/prisma";
import { generateToken } from "@/services/generateJWT";
import { generateRefreshToken } from "@/services/generateRefreshToken";
import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  type CreateUserResponse = {
    userData: {
      name: string;
      email: string;
      avatarUrl: string;  
    }
    token: string;
    refreshToken: {
      id: string;
      expiresIn: number;
      userId: string;
    };
  };

  try {
    const { name, email, password } = createUserBody.parse(await request.json());
    const id = createId()

    const firstLetterOfUsername = name.charAt(0).toUpperCase();
    const avatarUrl = "/profile-images/" + firstLetterOfUsername + ".png";

    await prisma.user.create({
      data: {
        id,
        name,
        email,
        avatarUrl,
        password,
      }
    })

    const tokenJwt = generateToken(id);
    const refreshToken = generateRefreshToken(id);

    const response: CreateUserResponse = {
      userData: {
        name: name,
        email: email,
        avatarUrl: avatarUrl,
      },
      token: tokenJwt,
      refreshToken: refreshToken,
    };

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