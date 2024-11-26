import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../servicio.service';
import { Usuario } from '../../usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './administracion.component.html',
  styles: ``
})

export default class AdministracionComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private adminService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  terminoBusqueda: string = '';

  filtrarPorBusqueda(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.correo.toLowerCase().includes(termino)
    );
  }
  

  filtroActivo: string = 'todos';
  usuariosFiltrados = [...this.usuarios]; // Copia inicial de los usuarios

  filtrarUsuarios(tipo: string): void {
    this.filtroActivo = tipo;
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (tipo === 'todos') {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(termino) ||
        usuario.correo.toLowerCase().includes(termino)
      );
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.tipo === tipo &&
        (usuario.nombre.toLowerCase().includes(termino) ||
         usuario.correo.toLowerCase().includes(termino))
      );
    }
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