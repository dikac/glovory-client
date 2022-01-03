export interface UserModel {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
