class Pedido {
    // Cria um novo pedido com as informações fornecidas
    constructor(id, idCliente, status, dataPedido) {
      // Guarda as informações do pedido
      this.id = id;
      this.idCliente = idCliente;
      this.status = status;
      this.dataPedido = dataPedido;
    }
    
    // Mostra as informações do pedido
    verDados() {
      return `ID: ${this.id}, ID Cliente: ${this.idCliente}, Status: ${this.status}, Data: ${this.dataPedido}`;
    }

    // Altera as informações do pedido e atualiza com os novo status
    modificarStatus(novoStatus) {
      this.status = novoStatus;
    }
  }
  // Permite usar a classe Cliente no arquivo main
  module.exports = Pedido;
  