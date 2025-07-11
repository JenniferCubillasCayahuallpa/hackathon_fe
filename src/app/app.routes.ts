import { Routes } from '@angular/router';
import { StudentFormComponent } from './feature/student/student-form/student-form.component';
import { StudentListComponent } from './feature/student/student-list/student-list.component';

export const routes: Routes = [
    {
        path: 'student-form',
        component: StudentFormComponent
    },
    {
        path: 'student-list',
        component: StudentListComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'student-list'
    }
];

