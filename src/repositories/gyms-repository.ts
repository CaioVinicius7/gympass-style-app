import type { Gym } from "@/types";

import type { CreateGymPayload, FindManyNearbyParams } from "./payloads";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  findMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  create(data: CreateGymPayload): Promise<Gym>;
}
