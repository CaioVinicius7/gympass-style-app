import { randomUUID } from "node:crypto";

import type { Gym } from "@/types";
import type { CreateGymPayload, FindManyNearbyParams } from "../payloads";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

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

  async findMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude
        },
        {
          latitude: item.latitude,
          longitude: item.longitude
        }
      );

      return distance < 10;
    });

    return gyms;
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
