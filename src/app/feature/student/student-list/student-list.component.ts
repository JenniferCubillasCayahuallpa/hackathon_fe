import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentFormComponent } from '../student-form/student-form.component';

interface StudentView {
  studentID?: string;
  dni: string;
  name: string;
  lastName: string;
  fechaNacimiento: string;
  email: string;
  phone: string;
  address: string;
  genero: string;
  departamento: string;
  provincia: string;
  distrito: string;
  programa: string;
  fechaRegistro?: string;
  estado: string;
}
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentFormComponent],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent {
  totalEstudiantes: number = 100; 
  estudiantesActivos: number = 80; 
  estudiantesInactivos: number = 20;
  filtroBusqueda: string = '';
  mostrarFormulario: boolean = false;

  estudiantesFiltrados: StudentView[] = [
    {
      studentID: '1',
      dni: '12345678',
      name: 'Carlos',
      lastName: 'Sánchez',
      fechaNacimiento: '2005-03-15',
      email: 'carlos@mail.com',
      phone: '912345678',
      address: 'Av. Perú 123',
      genero: 'Masculino',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'San Juan de Lurigancho',
      programa: 'Análisis de Sistemas',
      fechaRegistro: '2024-07-11',
      estado: 'A'
    }
  ];

  permitirSoloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

    abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  filtrarEstudiantes(): void {
    console.log('Filtrando estudiantes con:', this.filtroBusqueda);
  }

  generarReporte(): void {
    console.log('Generando reporte de estudiantes...');
    alert('Reporte generado exitosamente.');
  }
}
