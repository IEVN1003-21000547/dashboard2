export interface Usuario {
    idUsuario?: number;
    nombre: string;
    correo: string;
    password?: string;
    tipo: 'estudiante' | 'tutor';
    edad: number;
  }
  