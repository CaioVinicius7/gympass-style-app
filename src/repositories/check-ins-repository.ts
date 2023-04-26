import type { CheckIn } from "@/types";

import type { CreateCheckInPayload } from "./payloads";

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  create(data: CreateCheckInPayload): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
