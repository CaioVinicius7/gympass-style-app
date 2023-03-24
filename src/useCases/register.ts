import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password
}: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (userWithSameEmail) {
    throw new Error("A user with this e-mail already exists.");
  }

  const passwordHash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash
    }
  });
}