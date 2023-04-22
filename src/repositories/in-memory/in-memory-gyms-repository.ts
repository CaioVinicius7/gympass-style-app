import { randomUUID } from "node:crypto";

import type { Gym } from "@/types";

import type { CreateGymPayload } from "../payloads/create-gym-payload";
import type { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: CreateGymPayload): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude
    };

    this.items.push(gym);

    return gym;
  }
}
