import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { RegisterUseCase } from "./register";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jhondoe@example.com",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jhondoe@example.com",
      password: "123456"
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with the same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456"
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
