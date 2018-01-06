export type Value = string | number | boolean;

export interface SignupData {
  agreement: boolean;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}
