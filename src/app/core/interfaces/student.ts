export interface Student {
  studentID?: string; 
  nationalID: string; 
  firstName: string;
  lastName: string;
  birthDate: Date;
  email?: string;
  phone?: string; 
  address?: string;
  gender: 'M' | 'F'; 
  registrationDate?: Date; 
  status?: boolean;
  locationID: number;
  programID: number;
}
