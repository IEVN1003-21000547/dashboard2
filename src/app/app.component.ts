import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import AdministracionComponent from './dashboard/administracion/administracion.component';
import AgregarComponent from './dashboard/agregar/agregar.component';
import  LoginComponent  from './dashboard/login/login.component';
import { PrincipalComponent } from './dashboard/principal/principal.component';
import { LecturaComponent } from './dashboard/lectura/lectura.component';
import { EscrituraComponent } from './dashboard/escritura/escritura.component';
import { PrincipalmaestroComponent } from './dashboard/principalmaestro/principalmaestro.component';
import { PrincipalestudianteComponent } from './dashboard/principalestudiante/principalestudiante.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LecturaComponent, EscrituraComponent,PrincipalComponent, PrincipalmaestroComponent, PrincipalestudianteComponent, AdministracionComponent, AgregarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
