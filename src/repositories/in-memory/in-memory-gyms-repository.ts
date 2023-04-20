import { GymDTO } from "@/dtos/gym-dto";

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
}
