class Cliente {
    // Cria um novo cliente com as informações fornecidas
    constructor(id, nome, dataNascimento, cpf, email, senha) {
      // Guarda as informações do cliente
      this.id = id;
      this.nome = nome;
      this.dataNascimento = dataNascimento;
      this.cpf = cpf;
      this.email = email;
      this.senha = senha;
    }
  
    // Mostra as informações do cliente
    verDados() {
      // Junta as informações em uma única frase
      return `ID: ${this.id}, Nome: ${this.nome}, Data de Nascimento: ${this.dataNascimento}, CPF: ${this.cpf}, Email: ${this.email}`;
    }
  
    // Altera as informações do cliente
    modificarDados(novosDados) {
      // Atualiza as informações com os novos valores
      this.nome = novosDados.nome || this.nome;
      this.dataNascimento = novosDados.dataNascimento || this.dataNascimento;
      this.cpf = novosDados.cpf || this.cpf;
      this.email = novosDados.email || this.email;
      this.senha = novosDados.senha || this.senha;
    }
  }
  
  // Permite usar a classe Cliente no arquivo main
  module.exports = Cliente;  