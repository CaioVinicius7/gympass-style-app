export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "MEMBER" | "ADMIN";
  created_at: Date | string;
}
