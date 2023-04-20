import { GymDTO } from "@/dtos/gym-dto";

export interface GymsRepository {
  findById(id: string): Promise<GymDTO | null>;
}
