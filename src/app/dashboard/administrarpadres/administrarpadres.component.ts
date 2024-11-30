import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Padre } from '../../usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrarpadres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrarpadres.component.html',
  styles: []
})
export default class AdministrarPadresComponent implements OnInit {
  padres: Padre[] = [];
  cargando: boolean = false;
  error: string | null = null;
  editando: boolean = false;
  padreActual: Padre = { Nombre: '', Correo: '', MetodoPago: 'Efectivo', FechaExpiracion: 'Mes' }; // Inicialización

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerPadres();
  }

  obtenerPadres(): void {
    this.cargando = true;
    this.error = null;

    this.administracionService.obtenerPadres().subscribe({
      next: (data) => {
        this.padres = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los padres.';
        console.error(err);
        this.cargando = false;
      },
    });
  }

  editarPadre(padre: Padre): void {
    this.padreActual = { ...padre }; // Crear una copia para edición
    this.editando = true;
  }
  
  guardarPadre(): void {
    if (this.padreActual && this.padreActual.IdPadre !== undefined) {
      this.administracionService.actualizarPadre(this.padreActual.IdPadre, this.padreActual).subscribe({
        next: () => {
          this.editando = false;
          alert('Modificado con éxito');
          this.obtenerPadres(); // Actualizar la lista
        },
        error: (err) => {
          console.error(err);
          alert('Error al modificar el padre');
        },
      });
    } else {
      alert('El ID del padre es obligatorio');
    }
  }
  

  eliminarPadre(idPadre: number | undefined): void {
  if (idPadre !== undefined && confirm('¿Estás seguro de eliminar este padre?')) {
    this.administracionService.eliminarPadre(idPadre).subscribe({
      next: () => {
        alert('Eliminado con éxito');
        this.obtenerPadres();
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar el padre');
      },
    });
  } else {
    alert('ID no válido para eliminar');
  }
}

}
