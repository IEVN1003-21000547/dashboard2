import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../../servicio.service';
import { Padre } from '../../usuario';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-carritoindividual',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './carritoindividual.component.html',
  styles: ``,
})
export default class CarritoindividualComponent implements OnInit {
  padreForm!: FormGroup;
  pagoExitoso: boolean = false; // Variable para controlar el estado del modal

  constructor(
    private fb: FormBuilder,
    private adminService: AdministracionService
  ) {}

  ngOnInit(): void {
    this.padreForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', [Validators.required]],
      MetodoPago: ['', [Validators.required]],
      FechaExpiracion: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.padreForm.valid) {
      const nuevoPadre: Padre = this.padreForm.value;

      // Verificar si el padre ya existe
      this.adminService.obtenerPadres().pipe(
        switchMap((padres) => {
          const padreExistente = padres.find(
            (p) => p.Nombre === nuevoPadre.Nombre && p.Correo === nuevoPadre.Correo
          );

          if (padreExistente) {
            // Si el padre existe, actualizamos la fecha de expiración
            const padreActualizado = {
              ...padreExistente,
              FechaExpiracion: nuevoPadre.FechaExpiracion,
            };

            return this.adminService.actualizarPadre(padreExistente.IdPadre!, padreActualizado);
          } else {
            // Si no existe, agregamos un nuevo registro
            return this.adminService.agregarPadre(nuevoPadre);
          }
        })
      ).subscribe({
        next: () => {
          this.pagoExitoso = true; // Mostrar modal de éxito
          this.padreForm.reset(); // Resetear el formulario
        },
        error: (err) => {
          alert('Hubo un error al procesar la solicitud.');
          console.error(err);
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }

  cerrarModal(): void {
    this.pagoExitoso = false; // Cerrar el modal
  }
}
