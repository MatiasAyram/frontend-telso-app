import type { User } from "@/interfaces/user.interface";
// Funciona Login, Register, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}
