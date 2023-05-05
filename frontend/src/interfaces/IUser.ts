export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirmpassword?: string;
  image: File | null;
}
