import { prisma } from "@/lib/prisma";
import { generateToken } from "@/services/generateJWT";
import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  try {
    const { name, email, password } = createUserBody.parse(request.body);
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

    return NextResponse.json({
      name: name,
      email: email,
      avatarUrl: avatarUrl,
      token: tokenJwt,
    })

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