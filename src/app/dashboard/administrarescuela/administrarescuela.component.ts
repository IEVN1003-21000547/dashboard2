import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Escuela } from '../../usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrarescuela',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrarescuela.component.html',
  styles: []
})
export default class AdministrarescuelaComponent implements OnInit {
  escuelas: Escuela[] = [];
  cargando: boolean = false;
  error: string | null = null;
  editando: boolean = false;
  escuelaActual: Escuela = {
    Nombre: '',
    Direccion: '',
    Correo: '',
    Telefono: '',
    NumeroEscuela: '',
    MetodoPago: 'Efectivo',
    CantidadLicencias: 0,
    FechaExpiracion: 'Mes',
  }; // Inicialización

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerEscuelas();
  }

  obtenerEscuelas(): void {
    this.cargando = true;
    this.error = null;

    this.administracionService.obtenerEscuelas().subscribe({
      next: (data) => {
        this.escuelas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las escuelas.';
        console.error(err);
        this.cargando = false;
      },
    });
  }

  editarEscuela(escuela: Escuela): void {
    this.escuelaActual = { ...escuela }; // Crear una copia para edición
    this.editando = true;
  }

  guardarEscuela(): void {
    if (this.escuelaActual) {
      this.administracionService.actualizarEscuela(this.escuelaActual.IdEscuela!, this.escuelaActual).subscribe({
        next: () => {
          this.editando = false;
          alert('Modificado con éxito');
          this.obtenerEscuelas(); // Actualizar la lista
        },
        error: (err) => {
          console.error(err);
          alert('Error al modificar la escuela');
        },
      });
    }
  }

  eliminarEscuela(idEscuela: number | undefined): void {
    if (idEscuela === undefined) {
      alert('El ID de la escuela no es válido.');
      return;
    }
  
    if (confirm('¿Estás seguro de eliminar esta escuela?')) {
      this.administracionService.eliminarEscuela(idEscuela).subscribe({
        next: () => {
          alert('Escuela eliminada con éxito.');
          this.obtenerEscuelas();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la escuela.');
        },
      });
    }
  }
}
