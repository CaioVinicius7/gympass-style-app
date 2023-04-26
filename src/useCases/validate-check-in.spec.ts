import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to validate the check in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("Should not be able to validate an inexistent check in", async () => {
    await expect(
      sut.execute({
        checkInId: "inexistent-check-in-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be able to validate the check in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(23, 0, 1, 13, 40));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
