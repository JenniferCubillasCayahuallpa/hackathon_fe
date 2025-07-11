export interface Student {
  studentID?: string;
  dni: string;
  name: string;
  lastName: string;
  fechaNacimiento: Date;
  email: string;
  phone: string;
  address: string;
  genero: 'M' | 'F';
  programaID: number;
  ubicacionID: number; 
  fechaRegistro?: Date;
  estado?: 'Activo' | 'Inactivo';
}