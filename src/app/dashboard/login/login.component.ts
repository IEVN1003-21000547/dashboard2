import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { NgClass } from '@angular/common'; // Para [ngClass]
import { AdministracionService } from '../../servicio.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgClass], // Agrega los módulos necesarios
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private administracionService: AdministracionService
  ) {
    this.loginForm = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', [Validators.required, Validators.minLength(6)]], // Actualizado
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, llena todos los campos correctamente.';
      return;
    }

    const credenciales = this.loginForm.value;

    this.administracionService.loginAdministrador(credenciales).subscribe({
      next: (response) => {
        if (response.exito) {
          // Mostrar alert para inicio de sesión exitoso
          alert('Inicio de sesión exitoso');
          
          // Redirigir a la ruta principal
          this.router.navigate(['/principal']); // Ruta al componente principal.
        } else {
          this.errorMessage = response.mensaje || 'Credenciales incorrectas.';
        }
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
      },
    });
  }
}
