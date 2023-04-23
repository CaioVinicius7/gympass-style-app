import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check Ins History Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInsRepository);

    inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01"
    });
  });

  it("Should be able to fetch user check in history", async () => {
    const { checkIns } = await sut.execute({
      userId: "user-01"
    });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-01"
      }),
      expect.objectContaining({
        gym_id: "gym-02"
      })
    ]);
  });
});
