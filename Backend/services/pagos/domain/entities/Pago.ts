export class Pago {
  constructor(
    public id: number | null,
    public monto: number,
    public metodo: string,
    public fechaPago: Date | null = null,
  ) {}
}

