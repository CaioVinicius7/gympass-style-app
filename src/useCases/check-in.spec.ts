import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { CheckInUseCase } from "./check-in";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(inMemoryCheckInsRepository);
  });

  it("Should be able to authenticate", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01"
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
