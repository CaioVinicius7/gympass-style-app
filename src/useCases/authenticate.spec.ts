import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6)
    });

    const { user } = await sut.execute({
      email: "jhondoe@example.com",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

    await expect(() =>
      sut.execute({
        email: "jhondoe@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "jhondoe@example.com",
      password_hash: await hash("123456", 6)
    });

    await expect(() =>
      sut.execute({
        email: "jhondoe@example.com",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
