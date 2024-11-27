import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para redireccionar
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import Chart from 'chart.js/auto';

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

  // Variable para almacenar el promedio de los datos
  promedio: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      dato1: [0],
      dato2: [0],
    });
  }

  ngOnInit() {
    this.formulario.valueChanges.subscribe(() => {
      this.actualizarGrafico();
      this.calcularPromedio();
    });
  }

  // Método para calcular el promedio de los valores de Dato 1 y Dato 2
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
            data: [datos.dato1, datos.dato2], // Valores de Dato 1 y Dato 2
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          },
        ],
      },
    });
  }

  // Método para manejar el clic en el botón
  enviarCalificaciones() {
    if (confirm('¿Está seguro de enviar las calificaciones?')) {
      this.router.navigate(['/principalmaestro']); // Redirige al componente principalmaestro
    }
  }
}
