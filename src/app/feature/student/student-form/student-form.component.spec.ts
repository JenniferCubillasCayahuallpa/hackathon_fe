import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form.component';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentFormComponent],  
      imports: [FormsModule]              
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty student data', () => {
    expect(component.student.nationalID).toBe('');
    expect(component.student.firstName).toBe('');
    expect(component.student.lastName).toBe('');
    expect(component.student.programID).toBe('');
    expect(component.student.locationID).toBe('');
  });

  it('should invalidate form when required fields are empty', () => {
    component.student = {
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
    expect(component.isFormValid()).toBeFalse();
  });

  it('should validate form when required fields are filled', () => {
    component.student = {
      nationalID: '12345678',
      firstName: 'Juan',
      lastName: 'Perez',
      birthDate: '2000-01-01',
      gender: 'M',
      email: 'juan@example.com',
      phone: '987654321',
      address: 'Av. Siempre Viva 123',
      programID: '1',
      locationID: '1'
    };
    expect(component.isFormValid()).toBeTrue();
  });
});
