import { CheckInDTO } from "@/dtos/check-in-dto";
import { CreateCheckInDTO } from "@/dtos/create-check-in-dto";

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckInDTO | null>;
  create(data: CreateCheckInDTO): Promise<CheckInDTO>;
}
