import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { SearchGymsUseCase } from "./search-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(inMemoryGymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0
    });

    await inMemoryGymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym"
      })
    ]);
  });

  it("Should be able to search paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym 21"
      }),
      expect.objectContaining({
        title: "JavaScript Gym 22"
      })
    ]);
  });
});
