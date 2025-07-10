import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentFormComponent } from '../student-form/student-form.component';
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

    abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  filtrarEstudiantes(): void {
    console.log('Filtrando estudiantes con:', this.filtroBusqueda);
  }
}
