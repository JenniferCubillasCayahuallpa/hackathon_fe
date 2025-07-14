import { Program } from "./program";
import { Location } from "./location";

export interface Student {
  id?: number; 
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  email: string;
  phone: string;
  address: string;
  status?: 'A' | 'I';
  programId: number;
  locationId: number;
}