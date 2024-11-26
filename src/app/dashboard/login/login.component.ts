import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../../servicio.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: []
})
export default class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdministracionService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credenciales = this.loginForm.value;
  
      this.adminService.login(credenciales).subscribe({
        next: (response) => {
          if (response.exito) {
            alert('Login exitoso');
            // Almacenar el usuario en el localStorage
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
  
            // Verificar el tipo de usuario y redirigir
            const usuario = response.usuario;
            if (usuario.tipo === 'estudiante') {
              this.router.navigate(['/principalestudiante']); // Redirigir a la pantalla principal de estudiante
            } else if (usuario.tipo === 'administrador' || usuario.tipo === 'tutor') {
              this.router.navigate(['/principalmaestro']); // Redirigir a la pantalla principal de maestro/administrador
            } else {
              alert('Tipo de usuario no reconocido');
            }
          } else {
            alert(response.mensaje || 'Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          alert('Error al intentar iniciar sesión.');
        }
      });
    } else {
      alert('Por favor, completa los campos correctamente.');
    }
  }
  
  

  isCampoInvalido(campo: string): boolean {
    const control = this.loginForm.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
