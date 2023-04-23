import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

import type { CheckIn } from "@/types";

import type { CreateCheckInPayload } from "../payloads/create-check-in-payload";
import type { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkOnSameDate = this.items.find((item) => {
      const checkInDate = dayjs(item.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return item.user_id === userId && isOnSameDate;
    });

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    const checkIns = this.items.filter((item) => item.user_id === userId);

    return checkIns;
  }

  async create(data: CreateCheckInPayload): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
