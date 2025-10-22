const CreatePago = require('../../application/use-cases/CreatePago');
const GetPago = require('../../application/use-cases/GetPago');
const ListPagos = require('../../application/use-cases/ListPagos');
const PaymentService = require('../../application/services/PaymentService');
const PagoDTO = require('../dtos/PagoDTO');


class PagoController {
  constructor() {
    this.paymentService = new PaymentService();
    this.createPagoUseCase = new CreatePago(this.paymentService);
    this.getPagoUseCase = new GetPago(this.paymentService);
    this.listPagosUseCase = new ListPagos(this.paymentService);
  }

  // POST /pagos
  async createPago(req, res) {
    try {
      const dto = new PagoDTO(req.body);
      const result = await this.createPagoUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /pagos/:id
  async getPagoById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.getPagoUseCase.execute(id);
      if (!result) {
        return res.status(404).json({ message: 'Pago no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /pagos
  async getAllPagos(req, res) {
    try {
      const result = await this.listPagosUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PagoController;
