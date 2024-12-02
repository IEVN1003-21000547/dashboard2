import { Routes } from '@angular/router';
import { PrincipalComponent } from './dashboard/principal/principal.component';
import  LoginComponent  from './dashboard/login/login.component';
import AdministraralumnoComponent from './dashboard/administraralumno/administraralumno.component';
import AdministrarEscuelaComponent from './dashboard/administrarescuela/administrarescuela.component';
import AdministrarpadresComponent from './dashboard/administrarpadres/administrarpadres.component';
import  AgregaralumnoComponent  from './dashboard/agregaralumno/agregaralumno.component';
import AdministraradminsComponent from './dashboard/administraradmins/administraradmins.component';
import CarritoindividualComponent from './dashboard/carritoindividual/carritoindividual.component';
import CarritoempresarialComponent from './dashboard/carritoempresarial/carritoempresarial.component';
import YapagasteComponent from './dashboard/yapagaste/yapagaste.component';
import GraficasComponent from './dashboard/graficas/graficas.component';
import  PrincipaladminComponent  from './dashboard/principaladmin/principaladmin.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal' , component: PrincipalComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'principaladmin', component: PrincipaladminComponent},
  { path: 'login', component: LoginComponent},
  { path: 'administraralumno', component: AdministraralumnoComponent},
  { path: 'administrarescuela', component: AdministrarEscuelaComponent},
  { path: 'administrarpadres', component: AdministrarpadresComponent},
  { path: 'agregaralumno', component: AgregaralumnoComponent},
  { path: 'administraradmins', component: AdministraradminsComponent},
  { path: 'carritoindividual', component: CarritoindividualComponent},
  { path: 'carritoempresarial', component: CarritoempresarialComponent},
  { path: 'yapagaste', component: YapagasteComponent},
  { path: 'graficas', component: GraficasComponent},
  // { path: '', component: },
];