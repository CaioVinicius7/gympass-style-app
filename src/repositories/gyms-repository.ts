import { GymDTO } from "@/dtos/gym-dto";
import { CreateGymDTO } from "@/dtos/create-gym-dto";

export interface GymsRepository {
  findById(id: string): Promise<GymDTO | null>;
  create(data: CreateGymDTO): Promise<GymDTO>;
}
