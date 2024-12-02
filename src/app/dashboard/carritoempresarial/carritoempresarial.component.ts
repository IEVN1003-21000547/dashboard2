import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../../servicio.service'; // Asegúrate de que esta ruta sea correcta
import { Escuela } from '../../usuario'; // Asegúrate de que esta ruta sea correcta
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

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
      CantidadLicencias: ['', [Validators.required, Validators.min(1)]],
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

      this.adminService.agregarEscuela(nuevaEscuela).subscribe({
        next: (res) => {
          this.pagoExitoso = true;  // Activar el modal de éxito
          this.escuelaForm.reset();
        },
        error: (err) => {
          alert('Hubo un error al agregar la escuela');
          console.error(err);
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
