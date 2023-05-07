import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { CheckInUseCase } from "./check-in";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository
    );

    await inMemoryGymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: null,
      phone: "(35) 9 4002-8922",
      latitude: -22.4173682,
      longitude: -45.4869312
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.4173682,
      userLongitude: -45.4869312
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.4173682,
      userLongitude: -45.4869312
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -22.4173682,
        userLongitude: -45.4869312
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("Should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.4173682,
      userLongitude: -45.4869312
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.4173682,
      userLongitude: -45.4869312
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should be able to check in on distant gym", async () => {
    await inMemoryGymsRepository.create({
      id: "gym-02",
      title: "typeScript Gym",
      description: null,
      phone: "(35) 9 9999-9999",
      latitude: -22.4099913,
      longitude: -45.4370964
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -22.4173682,
        userLongitude: -45.4869312
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
