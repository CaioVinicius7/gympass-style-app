import { CreateUserDTO } from "@/dtos/create-user-dto";
import { UserDTO } from "@/dtos/user-dto";

import { usersRepository } from "../users-repository";

export class InMemoryUsersRepository implements usersRepository {
  public items: UserDTO[] = [];

  async findById(id: string): Promise<UserDTO | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<UserDTO> {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    };

    this.items.push(user);

    return user;
  }
}
