import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Student } from '../../../core/interfaces/student';
import { StudentService } from '../../../core/services/student.service';
import { ProgramService } from '../../../core/services/program.service';
import { LocationService } from '../../../core/services/location.service';
import { Program } from '../../../core/interfaces/program';
import { Location } from '../../../core/interfaces/location';
import { FechaCortaPipe } from '../../../core/services/fecha-corta.pipe';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentFormComponent, FechaCortaPipe],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  estudiantes: Student[] = [];
  estudiantesFiltrados: Student[] = [];
  filtroBusqueda: string = '';
  mostrarFormulario: boolean = false;
  mostrarActivos: boolean = true;
  estudianteEditando: Student | null = null;

  programas: Program[] = [];
  locations: Location[] = [];

  totalEstudiantes = 0;
  estudiantesActivos = 0;
  estudiantesInactivos = 0;

  constructor(
    private studentService: StudentService,
    private programService: ProgramService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.programService.getAll().subscribe(data => this.programas = data);
    this.locationService.getAll().subscribe(data => this.locations = data);
    // Cargar estudiantes activos por defecto
    this.loadActiveStudents();
  }

  loadActiveStudents(): void {
    this.studentService.getActive().subscribe({
      next: (students) => {
        this.estudiantes = students;
        this.estudiantesFiltrados = students;
        this.mostrarActivos = true;
        this.totalEstudiantes = students.length;
        this.estudiantesActivos = students.length;
      }
    });
  }

  loadInactiveStudents(): void {
    this.studentService.getInactive().subscribe({
      next: (students) => {
        this.estudiantes = students;
        this.estudiantesFiltrados = students;
        this.mostrarActivos = false;
        this.totalEstudiantes = students.length;
        this.estudiantesInactivos = students.length;
      }
    });
  }

  alternarListado(): void {
    this.estudianteEditando = null;
    if (this.mostrarActivos) {
      this.loadInactiveStudents();
    } else {
      this.loadActiveStudents();
    }
  }

  abrirFormulario() {
    this.estudianteEditando = null;
    this.mostrarFormulario = true;
  }

  editarEstudiante(estudiante: Student) {
    this.estudianteEditando = { ...estudiante };
    this.mostrarFormulario = true;
  }

  onGuardarEstudiante(estudiante: Student) {
    if (estudiante.id) {
      this.studentService.update(estudiante.id, estudiante).subscribe({
        next: () => {
          alert('Estudiante actualizado.');
          this.cerrarFormulario();
        },
        error: () => alert('Error actualizando.')
      });
    } else {
      this.studentService.save(estudiante).subscribe({
        next: () => {
          alert('Estudiante guardado.');
          this.cerrarFormulario();
        },
        error: () => alert('Error guardando.')
      });
    }
  }

  eliminarEstudiante(estudiante: Student) {
    if (confirm(`¿Seguro que deseas eliminar a ${estudiante.firstName}?`)) {
      this.studentService.delete(estudiante.id!).subscribe(() => {
        alert('Estudiante eliminado.');
        this.loadActiveStudents();
      });
    }
  }

  restaurarEstudiante(estudiante: Student) {
    if (confirm(`¿Restaurar a ${estudiante.firstName}?`)) {
      this.studentService.restore(estudiante.id!).subscribe(() => {
        alert('Estudiante restaurado.');
        this.loadInactiveStudents();
      });
    }
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.estudianteEditando = null;
    if (this.mostrarActivos) {
      this.loadActiveStudents();
    } else {
      this.loadInactiveStudents();
    }
  }

  filtrarEstudiantes(): void {
    if (!this.filtroBusqueda) {
      this.estudiantesFiltrados = this.estudiantes;
      return;
    }
    const filtro = this.filtroBusqueda.trim().toLowerCase();
    this.estudiantesFiltrados = this.estudiantes.filter(e => {
      return (
        (e.dni && e.dni.toLowerCase().includes(filtro)) ||
        (e.firstName && e.firstName.toLowerCase().includes(filtro)) ||
        (e.lastName && e.lastName.toLowerCase().includes(filtro)) ||
        (e.email && e.email.toLowerCase().includes(filtro)) ||
        (e.phone && e.phone.toLowerCase().includes(filtro)) ||
        (e.address && e.address.toLowerCase().includes(filtro)) ||
        (e.gender && (e.gender === 'M' ? 'masculino' : 'femenino').includes(filtro)) ||
        this.getNombrePrograma(e.programId).toLowerCase().includes(filtro) ||
        this.getNombreUbicacion(e.locationId).toLowerCase().includes(filtro) ||
        (e.birthDate && e.birthDate.toString().includes(filtro)) ||
        (e.registrationDate && e.registrationDate.toString().includes(filtro))
      );
    });
  }

  getNombrePrograma(id: number): string {
    const prog = this.programas.find(p => p.id === id);
    return prog ? prog.programName : '-';
  }

  getNombreUbicacion(id: number): string {
    const loc = this.locations.find(l => l.id === id);
    return loc ? `${loc.department} - ${loc.province} - ${loc.district}` : '-';
  }

  generarReporte(): void {
    alert('Reporte generado exitosamente.');
  }
}
