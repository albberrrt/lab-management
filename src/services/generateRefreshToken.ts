import { generateToken } from '@/services/generateJWT';
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";

export function generateRefreshToken(userId: string) {
  const expiresIn = dayjs().add(15, "second").unix();

  const generateRefreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      expiresIn,
    },
  })

  return generateRefreshToken;

}