import { CheckInDTO } from "@/dtos/check-in-dto";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckInDTO;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSomeDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSomeDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    });

    return {
      checkIn
    };
  }
}
