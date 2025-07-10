import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  @Output() close = new EventEmitter<void>(); 

  student = {
    nationalID: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    programID: '',
    locationID: ''
  };

  programs = [
    { programID: '1', programName: 'Análisis de Sistemas' },
    { programID: '2', programName: 'Producción Agraria' }
  ];

  locations = [
    { locationID: '1', department: 'Lima', province: 'Cañete', district: 'San Vicente' },
    { locationID: '2', department: 'Lima', province: 'Cañete', district: 'San Luis' },
    { locationID: '3', department: 'Lima', province: 'Cañete', district: 'Imperial' }
  ];

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Formulario enviado:', this.student);
      alert('¡Formulario guardado con éxito!');
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  permitirSoloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  isFormValid(): boolean {
    return (
      this.student.nationalID.length === 8 &&
      this.student.firstName.trim() !== '' &&
      this.student.lastName.trim() !== '' &&
      this.student.birthDate.trim() !== '' &&
      (this.student.gender === 'M' || this.student.gender === 'F') &&
      this.student.programID.trim() !== '' &&
      this.student.locationID.trim() !== ''
    );
  }

  cerrarFormulario() {
    this.close.emit(); 
  }
}
