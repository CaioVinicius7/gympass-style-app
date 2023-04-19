import { randomUUID } from "node:crypto";

import { CheckInDTO } from "@/dtos/check-in-dto";
import { CreateCheckInDTO } from "@/dtos/create-check-in-dto";

import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInDTO[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckInDTO | null> {
    const checkOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId
    );

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async create(data: CreateCheckInDTO): Promise<CheckInDTO> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
