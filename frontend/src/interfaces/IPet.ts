export interface IPet {
  name: string;
  age: string;
  weight: string;
  color: string;
  images: FileList;
  available: boolean;
  adopter?: object;
}
