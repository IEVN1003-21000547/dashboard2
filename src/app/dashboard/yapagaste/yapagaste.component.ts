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
  mostrarModal: boolean = false;

  constructor(private adminService: AdministracionService) {}

  verificarDatos() {
    const credencialesPadre = { Correo: this.correo, Contrasena: this.datoEspecifico };
  
    this.adminService.loginPadre(credencialesPadre).subscribe({
      next: (respuesta) => {
        console.log('Respuesta Padre:', respuesta); // <-- Depuración
        if (respuesta.exito) {
          if (respuesta.padre?.FechaExpiracion === 'Vencido') {
            alert('Necesitas pagar primero.');
          } else {
            this.abrirModal();
          }
        } else {
          const datosEscuela = { Nombre: this.nombre, Correo: this.correo, NumeroEscuela: this.datoEspecifico };
          this.adminService.verificarEscuela(datosEscuela).subscribe({
            next: (respuestaEscuela) => {
              console.log('Respuesta Escuela:', respuestaEscuela);
              if (respuestaEscuela.exito) {
                if (respuestaEscuela.escuela?.FechaExpiracion === 'Vencido') {
                  alert('Necesitas pagar primero.');
                } else {
                  this.abrirModal();
                }
              } else {
                alert('No se encontraron coincidencias.');
              }
            },
            error: (err) => {
              console.error('Error al verificar escuela:', err);
              alert('Error al verificar los datos.');
            },
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar padre:', err);
        alert('Error al verificar los datos.');
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
