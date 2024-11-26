import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../servicio.service';
import { Usuario } from '../../usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administracion.component.html',
  styles: ``
})

export default class AdministracionComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private adminService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Obtener todos los usuarios desde el servicio
  obtenerUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  // Eliminar usuario
  eliminarUsuario(id: number | undefined): void {
    if (id !== undefined) {
      this.adminService.eliminarUsuario(id).subscribe(
        () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== id);
        },
        (error) => {
          console.error('Error al eliminar usuario', error);
        }
      );
    }
  }
}