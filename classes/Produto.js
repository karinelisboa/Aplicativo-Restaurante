const Sistema = require('./Sistema');

class Produto extends Sistema {
  constructor(id, nome, descricao, dataValidade, preco, quantidade) {
    super(id, nome);
    this.descricao = descricao;
    this.dataValidade = dataValidade;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  verDados() {
    return `ID: ${this.id}, Nome: ${this.nome}, Descrição: ${this.descricao}, Data de Validade: ${this.dataValidade}, Preço: ${this.preco}, Quantidade: ${this.quantidade}`;
  }

  modificarDados(novosDados) {
    this.nome = novosDados.nome || this.nome;
    this.descricao = novosDados.descricao || this.descricao;
    this.dataValidade = novosDados.dataValidade || this.dataValidade;
    this.preco = novosDados.preco || this.preco;
    this.quantidade = novosDados.quantidade || this.quantidade;
  }
}

module.exports = Produto;