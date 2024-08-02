class Produto {
    // Cria um novo produto com as informações fornecidas
    constructor(id, nome, descricao, dataValidade, preco, quantidade) {
      // Guarda as informações do produto
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.dataValidade = dataValidade;
      this.preco = preco;
      this.quantidade = quantidade;
    }
    // Mostra as informações do produto
    verDados() {
      return `ID: ${this.id}, Nome: ${this.nome}, Descrição: ${this.descricao}, Data de Validade: ${this.dataValidade}, Preço: ${this.preco}, Quantidade: ${this.quantidade}`;
    }
   // Altera as informações do produto e atualiza com os novos valores
    modificarDados(novosDados) {
      this.nome = novosDados.nome || this.nome;
      this.descricao = novosDados.descricao || this.descricao;
      this.dataValidade = novosDados.dataValidade || this.dataValidade;
      this.preco = novosDados.preco || this.preco;
      this.quantidade = novosDados.quantidade || this.quantidade;
    }
  }
  // Permite usar a classe Produto no arquivo main
  module.exports = Produto;