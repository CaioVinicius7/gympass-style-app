import { UserDTO } from "@/dtos/user-dto";
import { CreateUserDTO } from "@/dtos/create-user-dto";

export interface usersRepository {
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  create(data: CreateUserDTO): Promise<UserDTO>;
}
