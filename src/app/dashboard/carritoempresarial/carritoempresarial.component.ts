import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../../servicio.service'; // Asegúrate de que esta ruta sea correcta
import { Escuela } from '../../usuario'; // Asegúrate de que esta ruta sea correcta
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Asegúrate de importar `of`

@Component({
  selector: 'app-carritoempresarial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './carritoempresarial.component.html',
  styles: []
})
export default class CarritoempresarialComponent implements OnInit {
  escuelaForm!: FormGroup;
  pagoExitoso = false;  // Variable para controlar la visibilidad del modal de éxito
  comprobantePago: any = null; // Variable para almacenar el archivo cargado del comprobante

  constructor(
    private fb: FormBuilder,
    private adminService: AdministracionService
  ) {}

  ngOnInit(): void {
    this.escuelaForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Correo: ['', [Validators.required, Validators.email]],
      Telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      NumeroEscuela: ['', [Validators.required]],
      MetodoPago: ['Efectivo', [Validators.required]],
      CantidadLicencias: ['', [Validators.required, Validators.pattern(/^(10|30|50)$/)]], // Validar que sea 10, 30 o 50
      FechaExpiracion: ['Mes', [Validators.required]],
      NumeroTarjeta: ['', []], 
      CVC: ['', []],
      Comprobante: [null, []]
    });
  }

  // Método para cerrar el modal de éxito
  cerrarModal(): void {
    this.pagoExitoso = false;
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.escuelaForm.valid) {
      const nuevaEscuela: Escuela = this.escuelaForm.value;

      // Verificar si la escuela ya existe en la base de datos
      this.adminService.obtenerEscuelas().pipe(
        switchMap((escuelas) => {
          const escuelaExistente = escuelas.find(
            (e) => e.Nombre === nuevaEscuela.Nombre && e.Correo === nuevaEscuela.Correo
          );

          if (escuelaExistente) {
            // Convertir los valores de licencias a números
            const licenciasExistentes = Number(escuelaExistente.CantidadLicencias);
            const nuevasLicencias = Number(nuevaEscuela.CantidadLicencias);

            // Validar que sean números válidos
            if (isNaN(licenciasExistentes) || isNaN(nuevasLicencias)) {
              alert('Hubo un error: Licencias inválidas.');
              return of(); // Retorna un observable vacío si hay un error
            }

            // Si la escuela existe, actualizamos las licencias y la fecha de expiración
            const licenciasActualizadas = licenciasExistentes + nuevasLicencias;
            const escuelaActualizada = { 
              ...escuelaExistente, 
              CantidadLicencias: licenciasActualizadas, 
              FechaExpiracion: nuevaEscuela.FechaExpiracion // Actualizamos la fecha de expiración
            };

            return this.adminService.actualizarEscuela(escuelaExistente.IdEscuela!, escuelaActualizada);
          } else {
            // Si no existe, agregar la nueva escuela
            return this.adminService.agregarEscuela(nuevaEscuela);
          }
        })
      ).subscribe({
        next: (res) => {
          this.pagoExitoso = true;
          this.escuelaForm.reset();
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
}
