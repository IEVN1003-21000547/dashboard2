import { Routes } from '@angular/router';
import  AdministracionComponent  from './dashboard/administracion/administracion.component';
import  AgregarComponent  from './dashboard/agregar/agregar.component';
import LoginComponent from './dashboard/login/login.component';
import { PrincipalComponent } from './dashboard/principal/principal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent},
  { path: 'administracion', component: AdministracionComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'login', component: LoginComponent }
];