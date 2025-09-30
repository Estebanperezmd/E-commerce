import { Pago } from '../../domain/entities/Pago';

// Simulación inicial (en producción conecta con DB vía repositorio)
export class PaymentService {
  private pagos: Pago[] = [];
  private idCounter = 1;

  async savePago(pago: Pago): Promise<Pago> {
    pago.id = this.idCounter++;
    pago.fechaPago = new Date();
    this.pagos.push(pago);
    return pago;
  }

  async findPagoById(id: number): Promise<Pago | null> {
    return this.pagos.find(p => p.id === id) || null;
  }

  async findAllPagos(): Promise<Pago[]> {
    return this.pagos;
  }
}
