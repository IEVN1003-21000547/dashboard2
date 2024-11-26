import { Routes } from '@angular/router';
import  AdministracionComponent  from './dashboard/administracion/administracion.component';
import  AgregarComponent  from './dashboard/agregar/agregar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/administracion', pathMatch: 'full' },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'agregar', component: AgregarComponent }
];