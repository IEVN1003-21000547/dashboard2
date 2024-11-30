import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministracionService } from '../../servicio.service';
import { Alumno } from '../../usuario';

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
      Contacto: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      const nuevoAlumno: Alumno = this.alumnoForm.value;
      this.servicio.agregarAlumno(nuevoAlumno).subscribe({
        next: (res) => {
          alert('Alumno agregado exitosamente');
          this.alumnoForm.reset();
        },
        error: (err) => {
          alert('Hubo un error al agregar al alumno');
          console.error(err);
        },
      });
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
