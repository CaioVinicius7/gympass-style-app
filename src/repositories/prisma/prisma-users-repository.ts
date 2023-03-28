import { usersRepository } from "../users-repository";

import { prisma } from "@/lib/prisma";
import { UserDTO } from "@/dtos/user-dto";
import { CreateUserDTO } from "@/dtos/create-user-dto";

export class PrismaUsersRepository implements usersRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  async create(data: CreateUserDTO): Promise<UserDTO> {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}
