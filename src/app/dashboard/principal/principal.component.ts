import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styles: ``,
})
export class PrincipalComponent {
  constructor(private router: Router) {}

  seleccionarPlan(tipo: string, duracion: string) {
    if (tipo === 'individual') {
      if (duracion === 'mensual') {
        this.router.navigate(['/plan-individual-mensual']);
      } else if (duracion === 'anual') {
        this.router.navigate(['/plan-individual-anual']);
      }
    } else if (tipo === 'empresarial') {
      if (duracion === 'mensual') {
        this.router.navigate(['/plan-empresarial-mensual']);
      } else if (duracion === 'anual') {
        this.router.navigate(['/plan-empresarial-anual']);
      }
    }
  }
}
