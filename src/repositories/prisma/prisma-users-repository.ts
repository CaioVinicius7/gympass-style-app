import { usersRepository } from "../users-repository";

import { prisma } from "@/lib/prisma";
import type { User } from "@/types";

import type { CreateUserPayload } from "../payloads/create-user-payload";

export class PrismaUsersRepository implements usersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  async create(data: CreateUserPayload): Promise<User> {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}
