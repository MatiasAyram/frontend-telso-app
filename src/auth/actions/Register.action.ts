import { tesloApi } from "@/api/TesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const RegisterAction = async (
  fullname: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post("/auth/register", {
      fullName: fullname,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
