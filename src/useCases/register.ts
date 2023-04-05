import { hash } from "bcryptjs";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

import { usersRepository } from "@/repositories/users-repository";
import type { UserDTO } from "@/dtos/user-dto";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: UserDTO;
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    });

    return {
      user
    };
  }
}
