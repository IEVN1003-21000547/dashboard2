import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import AdministracionComponent from './dashboard/administracion/administracion.component';
import AgregarComponent from './dashboard/agregar/agregar.component';
import  LoginComponent  from './dashboard/login/login.component';
import { PrincipalComponent } from './dashboard/principal/principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PrincipalComponent, AdministracionComponent, AgregarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
