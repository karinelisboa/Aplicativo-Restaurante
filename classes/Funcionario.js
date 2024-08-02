const Sistema = require('./Sistema');

class Funcionario extends Sistema {
  constructor(id, nomeUsuario, cpf, email, senha) {
    super(id, nomeUsuario, cpf, email, senha);
  }

  verDados() {
    return `ID: ${this.id}, Nome de Usuário: ${this.nome}, CPF: ${this.cpf}, Email: ${this.email}`;
  }
}

module.exports = Funcionario;
