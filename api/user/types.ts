export type UserRole = "admin" | "comprador" | "vendedor";

export interface IUser {
  _id: string | undefined;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string | undefined;
}

export interface IUserEdit{
  firts_name?: string;
  last_name?: string;
  user_name?: string;
  avatar?: string;
}
