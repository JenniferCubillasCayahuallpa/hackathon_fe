export interface Student {
  studentID?: number;
  dni: number;
  name: string;
  lastName: string;
  fechaNacimiento: Date;
  email: string;
  phone: string;
  address: string;
  genero: 'M' | 'F';
  programaID: string;
  ubicacionID: string;
  fechaRegistro?: Date;
  estado?: 'Activo' | 'Inactivo';
}