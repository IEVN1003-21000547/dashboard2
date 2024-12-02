import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministracionService } from '../../servicio.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregaraadmin',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  templateUrl: './agregaraadmin.component.html',
  styles: []
})
export default class AgregaraadminComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdministracionService) {
    // Inicializa el formulario
    this.adminForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  agregarAdministrador() {
    if (this.adminForm.valid) {
      const nuevoAdmin = this.adminForm.value;

      // Verificar si ya existe un administrador con los mismos datos
      this.adminService.obtenerAdministradores().subscribe(administradores => {
        const existe = administradores.some(admin =>
          admin.Nombre === nuevoAdmin.Nombre &&
          admin.Correo === nuevoAdmin.Correo &&
          admin.Contrasena === nuevoAdmin.Contrasena
        );

        if (existe) {
          alert('Ya existe un administrador con estos datos.');
        } else {
          // Si no existe, agregar el administrador
          this.adminService.agregarAdministrador(nuevoAdmin).subscribe(
            () => {
              alert('Administrador agregado con éxito.');
              this.adminForm.reset();
            },
            () => {
              alert('Error al agregar el administrador.');
            }
          );
        }
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
