import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Alumno } from '../../usuario';
import { Escuela } from '../../usuario';
import { Padre } from '../../usuario';

@Component({
  selector: 'app-agregaralumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregaralumno.component.html',
  styles: ``,
})
export default class AgregaralumnoComponent {
  alumnoForm: FormGroup;

  constructor(private fb: FormBuilder, private servicio: AdministracionService) {
    this.alumnoForm = this.fb.group({
      Matricula: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Escuela: ['', [Validators.required]],
      Contacto: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      const nuevoAlumno: Alumno = this.alumnoForm.value;

      this.servicio.obtenerAlumnos().subscribe({
        next: (alumnos: Alumno[]) => {
          const alumnoExistente = alumnos.find(
            (alumno) =>
              alumno.Matricula === nuevoAlumno.Matricula ||
              (alumno.Nombre.toLowerCase() === nuevoAlumno.Nombre.toLowerCase() &&
                alumno.Escuela.toLowerCase() === nuevoAlumno.Escuela.toLowerCase())
          );

          if (alumnoExistente) {
            alert('Ya existe un alumno con la misma matrícula o los mismos datos (Nombre y Escuela).');
            return;
          }

          this.servicio.obtenerPadres().subscribe({
            next: (padres: Padre[]) => {
              const padreEncontrado = padres.find(
                (padre) => padre.Nombre.toLowerCase() === nuevoAlumno.Escuela.toLowerCase()
              );

              if (padreEncontrado) {
                const alumnoConMismoPadre = alumnos.find(
                  (alumno) => alumno.Escuela.toLowerCase() === padreEncontrado.Nombre.toLowerCase()
                );

                if (alumnoConMismoPadre) {
                  alert('Este padre o tutor ya ha usado una licencia.');
                  return;
                }

                // Si pasa la validación, se agrega el alumno
                this.agregarAlumno(nuevoAlumno);
              } else {
                this.verificarEscuelaYAgregar(nuevoAlumno);
              }
            },
            error: (err) => {
              alert('Hubo un error al verificar los padres.');
              console.error(err);
            },
          });
        },
        error: (err) => {
          alert('Hubo un error al verificar los alumnos.');
          console.error(err);
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }

  private verificarEscuelaYAgregar(nuevoAlumno: Alumno): void {
    this.servicio.obtenerEscuelas().subscribe({
      next: (escuelas: Escuela[]) => {
        const escuelaEncontrada = escuelas.find(
          (escuela) => escuela.Nombre.toLowerCase() === nuevoAlumno.Escuela.toLowerCase()
        );

        if (escuelaEncontrada) {
          if (escuelaEncontrada.CantidadLicencias > 0) {
            const escuelaActualizada: Partial<Escuela> = {
              ...escuelaEncontrada,
              CantidadLicencias: escuelaEncontrada.CantidadLicencias - 1,
            };

            this.servicio.actualizarEscuela(escuelaEncontrada.IdEscuela!, escuelaActualizada).subscribe({
              next: () => this.agregarAlumno(nuevoAlumno),
              error: (err) => {
                alert('Error al actualizar la escuela.');
                console.error(err);
              },
            });
          } else {
            alert('No hay licencias disponibles para esta escuela.');
          }
        } else {
          alert('La escuela ingresada no existe.');
        }
      },
      error: (err) => {
        alert('Hubo un error al verificar las escuelas.');
        console.error(err);
      },
    });
  }

  private agregarAlumno(alumno: Alumno): void {
    this.servicio.agregarAlumno(alumno).subscribe({
      next: () => {
        alert('Alumno agregado exitosamente.');
        this.alumnoForm.reset();
      },
      error: (err) => {
        alert('Hubo un error al agregar al alumno.');
        console.error(err);
      },
    });
  }
}
