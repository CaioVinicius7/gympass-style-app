import type { CheckIn } from "@/types";

import type { CreateCheckInPayload } from "./payloads";

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string): Promise<CheckIn[]>;
  create(data: CreateCheckInPayload): Promise<CheckIn>;
}
