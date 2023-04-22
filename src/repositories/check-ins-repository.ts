import type { CheckIn } from "@/types";

import type { CreateCheckInPayload } from "./payloads";

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: CreateCheckInPayload): Promise<CheckIn>;
}
