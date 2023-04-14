import { CheckInDTO } from "@/dtos/check-in-dto";
import { CreateCheckInDTO } from "@/dtos/create-check-in-dto";

export interface CheckInsRepository {
  create(data: CreateCheckInDTO): Promise<CheckInDTO>;
}
