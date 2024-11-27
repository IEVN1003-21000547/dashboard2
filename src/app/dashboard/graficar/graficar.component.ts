import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import Chart from 'chart.js/auto';
import { AdministracionService } from '../../servicio.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-graficar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './graficar.component.html',
})
export default class GraficarComponent implements OnInit {
  @ViewChild('graficoCanvas') graficoCanvas!: ElementRef;
  formulario: FormGroup;
  grafico: Chart | undefined;

  promedio: number = 0;
  estudiantes: Usuario[] = [];
  estudianteSeleccionado: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private administracionService: AdministracionService
  ) {
    this.formulario = this.fb.group({
      dato1: [0],
      dato2: [0],
    });
  }

  ngOnInit() {
    this.obtenerEstudiantes();
    this.formulario.valueChanges.subscribe(() => {
      this.actualizarGrafico();
      this.calcularPromedio();
    });
  }

  obtenerEstudiantes() {
    this.administracionService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.estudiantes = usuarios.filter(user => user.tipo === 'estudiante');
      },
      error: (err) => console.error('Error al obtener estudiantes:', err),
    });
  }

  seleccionarEstudiante() {
    const estudiante = this.estudiantes.find(e => e.idUsuario === this.estudianteSeleccionado);
    if (estudiante) {
      alert(`Has seleccionado a ${estudiante.nombre}`);
    }
  }

  calcularPromedio() {
    const { dato1, dato2 } = this.formulario.value;
    this.promedio = (dato1 + dato2) / 2;
  }

  actualizarGrafico() {
    const datos = this.formulario.value;
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.graficoCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Dato 1', 'Dato 2'],
        datasets: [
          {
            label: 'Datos',
            data: [datos.dato1, datos.dato2],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          },
        ],
      },
    });
  }

  enviarCalificaciones() {
    if (confirm('¿Está seguro de enviar las calificaciones?')) {
      this.formulario.reset({
        dato1: 0,
        dato2: 0,
      });
      this.router.navigate(['/graficar']);
    }
  }
}
