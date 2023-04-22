import type { Gym } from "@/types";

import type { CreateGymPayload } from "./payloads";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: CreateGymPayload): Promise<Gym>;
}
