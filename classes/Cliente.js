const Sistema = require('./Sistema');

class Cliente extends Sistema {
  constructor(id, nome, dataNascimento, cpf, email, senha) {
    super(id, nome, cpf, email, senha);
    this.dataNascimento = dataNascimento;
  }

  verDados() {
    return `ID: ${this.id}, Nome: ${this.nome}, Data de Nascimento: ${this.dataNascimento}, CPF: ${this.cpf}, Email: ${this.email}`;
  }
}

module.exports = Cliente;
