import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../../core/interfaces/student';
import { Program } from '../../../core/interfaces/program';
import { Location } from '../../../core/interfaces/location';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnChanges {
  @Output() close = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Student>();
  @Input() student: Student | null = null;
  @Input() programs: Program[] = [];
  @Input() locations: Location[] = [];

  modoEdicion = false;
  studentForm: Student = this.getEmptyStudent();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && this.student) {
      // Crea una copia profunda para editar localmente
      this.studentForm = JSON.parse(JSON.stringify(this.student));
      this.modoEdicion = !!this.studentForm.id;
    } else if (changes['student'] && !this.student) {
      this.studentForm = this.getEmptyStudent();
      this.modoEdicion = false;
    }
  }

  getEmptyStudent(): Student {
    return {
      dni: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '' as any,
      email: '',
      phone: '',
      address: '',
      programId: null!,
      locationId: null!
    };
  }

  onSubmit() {
  if (this.isFormValid()) {
    // ¡Aquí asegúrate de solo enviar el id!
    const estudianteParaGuardar: Student = {
      ...this.studentForm,
      programId: typeof this.studentForm.programId === 'object'
        ? this.studentForm.programId
        : this.studentForm.programId,
      locationId: typeof this.studentForm.locationId === 'object'
        ? this.studentForm.locationId
        : this.studentForm.locationId
    };

    this.guardar.emit(estudianteParaGuardar);
  } else {
    alert('Por favor, complete el formulario correctamente.');
  }
}

  isFormValid(): boolean {
    return (
      this.studentForm.dni.length === 8 &&
      this.studentForm.firstName.trim() !== '' &&
      this.studentForm.lastName.trim() !== '' &&
      this.studentForm.birthDate !== '' &&
      (this.studentForm.gender === 'M' || this.studentForm.gender === 'F') &&
      !!this.studentForm.programId &&
      !!this.studentForm.locationId
    );
  }

  permitirSoloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  cerrarFormulario() {
    this.close.emit();
  }
}
