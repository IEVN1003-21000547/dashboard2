import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escritura',
  standalone: true,
  templateUrl: './escritura.component.html',
  styles: []
})
export class EscrituraComponent {
  constructor(private router: Router) {}

  // Método que muestra un alert de confirmación
  confirmarGuardar() {
    const respuesta = window.confirm('¿Seguro que quieres guardar?');
    if (respuesta) {
      this.router.navigate(['/principalestudiante']);
    }
  }
}
