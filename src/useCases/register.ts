import { hash } from "bcryptjs";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

import { usersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    });
  }
}
