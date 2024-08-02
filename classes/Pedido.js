const Sistema = require('./Sistema');

class Pedido extends Sistema {
  constructor(id, idCliente, status, dataPedido) {
    super(id);
    this.idCliente = idCliente;
    this.status = status;
    this.dataPedido = dataPedido;
  }

  verDados() {
    return `ID: ${this.id}, ID Cliente: ${this.idCliente}, Status: ${this.status}, Data: ${this.dataPedido}`;
  }

  modificarStatus(novoStatus) {
    this.status = novoStatus;
  }
}

module.exports = Pedido;
  