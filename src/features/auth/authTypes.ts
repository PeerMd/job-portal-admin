export interface Admin {
  username: string;
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
