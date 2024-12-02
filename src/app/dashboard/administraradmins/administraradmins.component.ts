import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Administrador } from '../../usuario';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-administraradmins',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './administraradmins.component.html',
  styles: []
})
export default class AdministraradminsComponent implements OnInit {
  administradores: Administrador[] = [];
  cargando: boolean = false;
  error: string | null = null;
  editando: boolean = false;
  administradorActual: Administrador = {Nombre: '', Correo: '', Contrasena: '' };

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerAdministradores();
  }

  obtenerAdministradores(): void {
    this.cargando = true;
    this.error = null;

    this.administracionService.obtenerAdministradores().subscribe({
      next: (data) => {
        this.administradores = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los administradores.';
        console.error(err);
        this.cargando = false;
      },
    });
  }

  editarAdministrador(admin: Administrador): void {
    this.administradorActual = { ...admin }; // Crear una copia para edición
    this.editando = true;
  }

  guardarAdministrador(): void {
    if (this.administradorActual) {
      this.administracionService
        .actualizarAdministrador(this.administradorActual.IdAdministrador!, this.administradorActual)
        .subscribe({
          next: () => {
            this.editando = false;
            alert('Administrador modificado con éxito');
            this.obtenerAdministradores(); // Actualizar la lista
          },
          error: (err) => {
            console.error(err);
            alert('Error al modificar el administrador');
          },
        });
    }
  }

  eliminarAdministrador(id: number): void {
    if (confirm('¿Estás seguro de eliminar este administrador?')) {
      this.administracionService.eliminarAdministrador(id).subscribe({
        next: () => {
          alert('Administrador eliminado con éxito');
          this.obtenerAdministradores();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el administrador');
        },
      });
    }
  }
}
