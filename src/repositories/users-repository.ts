import { UserDTO } from "@/dtos/user-dto";
import { CreateUserDTO } from "@/dtos/create-user-dto";

export interface usersRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  create(data: CreateUserDTO): Promise<UserDTO>;
}
