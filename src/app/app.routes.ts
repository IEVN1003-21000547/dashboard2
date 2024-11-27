import { Routes } from '@angular/router';
import  AdministracionComponent  from './dashboard/administracion/administracion.component';
import  AgregarComponent  from './dashboard/agregar/agregar.component';
import LoginComponent from './dashboard/login/login.component';
import { PrincipalComponent } from './dashboard/principal/principal.component';
import { LecturaComponent } from './dashboard/lectura/lectura.component';
import { EscrituraComponent } from './dashboard/escritura/escritura.component';
import { PrincipalmaestroComponent } from './dashboard/principalmaestro/principalmaestro.component';
import { PrincipalestudianteComponent } from './dashboard/principalestudiante/principalestudiante.component';
import GraficarComponent from './dashboard/graficar/graficar.component';
import AgregarloginComponent from './dashboard/agregarlogin/agregarlogin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent},
  { path: 'administracion', component: AdministracionComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lectura', component: LecturaComponent },
  { path: 'escritura', component: EscrituraComponent },
  { path: 'principalmaestro', component: PrincipalmaestroComponent },
  { path: 'principalestudiante', component: PrincipalestudianteComponent},
  { path: 'graficar', component: GraficarComponent},
  { path: 'agregarlogin', component: AgregarloginComponent},
];