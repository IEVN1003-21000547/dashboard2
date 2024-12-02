export interface Administrador {
  IdAdministrador?: number;
  Nombre: string;
  Correo: string;
  Contrasena?: string;
}

export interface Escuela {
  IdEscuela?: number;
  Nombre: string;
  Direccion: string;
  Correo: string;
  Telefono: string;
  NumeroEscuela: string;
  MetodoPago: 'Efectivo' | 'Tarjeta';
  CantidadLicencias: number;
  FechaExpiracion: 'Mes' | 'Año';
}

export interface Alumno {
  Matricula: string;
  Nombre: string;
  Escuela: string;
  Contacto: string;
}

export interface Padre {
  IdPadre?: number;
  Nombre: string;
  Correo: string;
  Contrasena?: string;
  MetodoPago: 'Efectivo' | 'Tarjeta';
  FechaExpiracion: 'Mes' | 'Año';
}
