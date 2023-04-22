import { randomUUID } from "node:crypto";

import type { GymDTO } from "@/dtos/gym-dto";
import type { CreateGymDTO } from "@/dtos/create-gym-dto";

import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: GymDTO[] = [];

  async findById(id: string): Promise<GymDTO | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: CreateGymDTO): Promise<GymDTO> {
    const gym = {
      id: randomUUID(),
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
