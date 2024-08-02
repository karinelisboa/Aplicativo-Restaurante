class Funcionario {
    // Cria um novo funcionario com as informações fornecidas
    constructor(id, nomeUsuario, cpf, email, senha) {
      // Guarda as informações do funcionario
      this.id = id;
      this.nomeUsuario = nomeUsuario;
      this.cpf = cpf;
      this.email = email;
      this.senha = senha;
    }
    // Mostra as informações do funcionario
    verDados() {
      return `ID: ${this.id}, Nome de Usuário: ${this.nomeUsuario}, CPF: ${this.cpf}, Email: ${this.email}`;
    }
    // Altera as informações do cliente e atualiza com os novos valores
    modificarDados(novosDados) {
      this.nomeUsuario = novosDados.nomeUsuario || this.nomeUsuario;
      this.cpf = novosDados.cpf || this.cpf;
      this.email = novosDados.email || this.email;
      this.senha = novosDados.senha || this.senha;
    }
  }
  // Permite usar a classe Funcionario no arquivo main
  module.exports = Funcionario;