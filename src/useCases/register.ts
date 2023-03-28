import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { usersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userWithSameEmail) {
      throw new Error("A user with this e-mail already exists.");
    }

    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    });
  }
}
