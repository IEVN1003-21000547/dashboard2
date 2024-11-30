import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Alumno } from '../../usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administraralumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administraralumno.component.html',
  styles: []
})
export default class AdministraralumnoComponent implements OnInit {
  alumnos: Alumno[] = [];
  cargando: boolean = false;
  error: string | null = null;
  editando: boolean = false;
  alumnoActual: Alumno = { Matricula: '', Nombre: '', Escuela: '', Contacto: '' }; // Inicialización

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.cargando = true;
    this.error = null;

    this.administracionService.obtenerAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los alumnos.';
        console.error(err);
        this.cargando = false;
      },
    });
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoActual = { ...alumno }; // Crear una copia para edición
    this.editando = true;
  }

  guardarAlumno(): void {
    if (this.alumnoActual) {
      this.administracionService.actualizarAlumno(this.alumnoActual.Matricula, this.alumnoActual).subscribe({
        next: () => {
          this.editando = false;
          alert('Modificado con éxito');
          this.obtenerAlumnos(); // Actualizar la lista
        },
        error: (err) => {
          console.error(err);
          alert('Error al modificar el alumno');
        },
      });
    }
  }

  eliminarAlumno(matricula: string): void {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.administracionService.eliminarAlumno(matricula).subscribe({
        next: () => {
          alert('Eliminado con éxito');
          this.obtenerAlumnos();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el alumno');
        },
      });
    }
  }
}
