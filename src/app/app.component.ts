import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { PrincipalComponent } from './dashboard/principal/principal.component';
import  LoginComponent  from './dashboard/login/login.component';
import AdministraralumnoComponent from './dashboard/administraralumno/administraralumno.component';
import AdministrarpadresComponent from './dashboard/administrarpadres/administrarpadres.component';
import  AdministrarescuelaComponent  from './dashboard/administrarescuela/administrarescuela.component';
import AgregaralumnoComponent from './dashboard/agregaralumno/agregaralumno.component';
import AdministraradminsComponent from './dashboard/administraradmins/administraradmins.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,PrincipalComponent, LoginComponent, AdministraralumnoComponent, AdministrarescuelaComponent, AdministrarpadresComponent, AdministraradminsComponent,AgregaralumnoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
