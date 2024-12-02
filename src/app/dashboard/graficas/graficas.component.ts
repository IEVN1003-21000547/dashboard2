import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AdministracionService } from '../../servicio.service';
import { NavbarComponent } from '../navbar/navbar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './graficas.component.html',
  styles: ``,
})
export default class GraficasComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;

  private pieChart!: Chart;
  private barChart!: Chart;

  constructor(private administracionService: AdministracionService) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosDePago();
  }

  cargarDatos(): void {
    let totalPadres = 0;
    let totalEscuelas = 0;

    // Obtener datos de padres y escuelas
    this.administracionService.obtenerPadres().subscribe({
      next: (padres) => {
        totalPadres = padres.length;

        this.administracionService.obtenerEscuelas().subscribe({
          next: (escuelas) => {
            totalEscuelas = escuelas.length;

            // Configurar y mostrar la gráfica de pastel
            this.mostrarGrafica(totalPadres, totalEscuelas);
          },
          error: (err) => console.error('Error al obtener escuelas:', err),
        });
      },
      error: (err) => console.error('Error al obtener padres:', err),
    });
  }

  cargarDatosDePago(): void {
    this.administracionService.obtenerPadres().subscribe({
      next: (padres) => {
        const pagosEfectivo = padres.filter((padre) => padre.MetodoPago === 'Efectivo').length;
        const pagosTarjeta = padres.filter((padre) => padre.MetodoPago === 'Tarjeta').length;

        // Configurar y mostrar la gráfica de barras
        this.mostrarGraficaBarras(pagosEfectivo, pagosTarjeta);
      },
      error: (err) => console.error('Error al obtener datos de pagos:', err),
    });
  }

  mostrarGrafica(totalPadres: number, totalEscuelas: number): void {
    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: ['Individuales', 'Empresariales'],
        datasets: [
          {
            data: [totalPadres, totalEscuelas],
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    };

    // Crear gráfico en el canvas de pastel
    this.pieChart = new Chart(this.pieCanvas.nativeElement, config);
  }

  mostrarGraficaBarras(pagosEfectivo: number, pagosTarjeta: number): void {
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Efectivo', 'Tarjeta'],
        datasets: [
          {
            label: 'Métodos de Pago',
            data: [pagosEfectivo, pagosTarjeta],
            backgroundColor: ['#FF9F40', '#4BC0C0'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Crear gráfico en el canvas de barras
    this.barChart = new Chart(this.barCanvas.nativeElement, config);
  }
}
