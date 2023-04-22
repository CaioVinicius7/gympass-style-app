import type { User } from "@/types";

import type { CreateUserPayload } from "./payloads";

export interface usersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserPayload): Promise<User>;
}
