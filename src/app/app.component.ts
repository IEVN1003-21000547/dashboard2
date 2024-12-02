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
import CarritoindividualComponent from './dashboard/carritoindividual/carritoindividual.component';
import CarritoempresarialComponent from './dashboard/carritoempresarial/carritoempresarial.component';
import YapagasteComponent from './dashboard/yapagaste/yapagaste.component';
import GraficasComponent  from './dashboard/graficas/graficas.component';
import PrincipaladminComponent from './dashboard/principaladmin/principaladmin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,PrincipalComponent,LoginComponent, 
    AdministraralumnoComponent, AdministrarescuelaComponent, AdministrarpadresComponent, 
    AdministraradminsComponent,AgregaralumnoComponent, CarritoindividualComponent, 
    CarritoempresarialComponent, YapagasteComponent, GraficasComponent, PrincipaladminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
