import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { usersRepository } from "../users-repository";

export class PrismaUsersRepository implements usersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}
