import { ADMIN_CREDENTIALS } from "@/constants";
import { LoginCredentials } from "@/features/auth/authTypes";
import { Admin } from "@/types";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<Admin> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        resolve({ username: credentials.username });
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 500);
  });
};
