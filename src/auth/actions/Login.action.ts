import { tesloApi } from "@/api/TesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const LoginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    console.log({ data });
    return data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
