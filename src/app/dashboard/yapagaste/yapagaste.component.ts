import { Component } from '@angular/core';
import { AdministracionService } from '../../servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yapagaste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './yapagaste.component.html',
  styles: [],
})
export default class YapagasteComponent {
  nombre: string = '';
  correo: string = '';
  datoEspecifico: string = '';
  mostrarModal: boolean = false; // Estado del modal

  constructor(private adminService: AdministracionService) {}

  verificarDatos() {
    const credencialesPadre = { Correo: this.correo, Contrasena: this.datoEspecifico };
    this.adminService.loginPadre(credencialesPadre).subscribe({
      next: (respuesta) => {
        if (respuesta.exito) {
          this.abrirModal();
        } else {
          const credencialesEscuela = { Correo: this.correo, Contrasena: this.datoEspecifico };
          this.adminService.loginAdministrador(credencialesEscuela).subscribe({
            next: (respuestaEscuela) => {
              if (respuestaEscuela.exito) {
                this.abrirModal();
              } else {
                alert('No se encontraron coincidencias.');
              }
            },
            error: () => {
              alert('Error al verificar los datos de la escuela.');
            },
          });
        }
      },
      error: () => {
        alert('Error al verificar los datos del padre.');
      },
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}