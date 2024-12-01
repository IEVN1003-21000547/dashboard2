import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../../servicio.service';
import { Padre } from '../../usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carritoindividual',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './carritoindividual.component.html',
  styles: ``,
})
export default class CarritoindividualComponent implements OnInit {
  padreForm!: FormGroup;

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
      FechaExpiracion: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.padreForm.valid) {
      const nuevoPadre: Padre = this.padreForm.value;  // Usamos la interfaz Padre
      this.adminService.agregarPadre(nuevoPadre).subscribe({
        next: (res) => {
          alert('Padre agregado exitosamente');
          this.padreForm.reset();  // Reseteamos el formulario después de enviar
        },
        error: (err) => {
          alert('Hubo un error al agregar al padre');
          console.error(err);
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
