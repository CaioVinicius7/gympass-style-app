import { randomUUID } from "node:crypto";

import type { User } from "@/types";

import type { CreateUserPayload } from "../payloads/create-user-payload";
import type { usersRepository } from "../users-repository";

export class InMemoryUsersRepository implements usersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CreateUserPayload): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: "MEMBER",
      created_at: new Date()
    };

    this.items.push(user);

    return user;
  }
}
