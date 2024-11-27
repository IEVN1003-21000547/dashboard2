import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministracionService } from '../../servicio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregarlogin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregarlogin.component.html',
  styles: ''
})
export default class AgregarloginComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdministracionService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(4), Validators.max(100)]]
    });
  }

  ngOnInit() {
    // Para debug - muestra el estado del formulario en la consola
    this.usuarioForm.valueChanges.subscribe(val => {
      console.log('Form values:', val);
      console.log('Form valid:', this.usuarioForm.valid);
      console.log('Form errors:', this.usuarioForm.errors);
    });
  }

  onSubmit() {
    console.log('Form submitted');
    console.log('Form valid:', this.usuarioForm.valid);
    console.log('Form values:', this.usuarioForm.value);
    
    if (this.usuarioForm.valid) {
      const confirmacion = window.confirm('¿Deseas agregar este usuario a la base de datos?');

      if (confirmacion) {
        const nuevoUsuario = {
          nombre: this.usuarioForm.get('nombre')!.value,
          correo: this.usuarioForm.get('correo')!.value,
          password: this.usuarioForm.get('password')!.value,
          tipo: this.usuarioForm.get('tipo')!.value,
          edad: parseInt(this.usuarioForm.get('edad')!.value)
        };

        console.log('Enviando usuario:', nuevoUsuario);

        this.adminService.agregarUsuario(nuevoUsuario).subscribe({
          next: (response) => {
            alert('Usuario agregado correctamente');
            this.usuarioForm.reset();
          },
          error: (error) => {
            alert('Error al agregar usuario: ' + error.message);
            console.error('Error al agregar usuario:', error);
          }
        });
      }
    } else {
      Object.keys(this.usuarioForm.controls).forEach(key => {
        const control = this.usuarioForm.get(key);
        if (control) {
          control.markAsTouched();
          console.log(`${key} errors:`, control.errors);
        }
      });
      alert('Por favor, completa todos los campos correctamente');
    }
  }
  isCampoInvalido(campo: string): boolean {
    const control = this.usuarioForm.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}