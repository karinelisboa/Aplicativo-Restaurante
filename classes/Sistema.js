// Classe mãe
class Sistema {
  constructor(id, nome, cpf, email, senha) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.clientes = [];
    this.funcionarios = [];
    this.pedidos = [];
    this.produtos = [];
    this.usuarioLogado = null;
  }

  // Retorna os dados básicos do usuário
  verDados() {
    return `ID: ${this.id}, Nome: ${this.nome}, CPF: ${this.cpf}, Email: ${this.email}`;
  }

  // Modifica os dados atuais do usuário
  modificarDados(novosDados) {
    this.nome = novosDados.nome || this.nome;
    this.cpf = novosDados.cpf || this.cpf;
    this.email = novosDados.email || this.email;
    this.senha = novosDados.senha || this.senha;
  }

  // Adiciona novos valores a cada respectiva classe
  adicionarCliente(cliente) {
    this.clientes.push(cliente);
  }

  adicionarFuncionario(funcionario) {
    this.funcionarios.push(funcionario);
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  adicionarPedido(pedido) {
    this.pedidos.push(pedido);
  }
  
  // Lista todos os valores da respectiva classe (alguns em ordem)
  listarClientes() {
    return this.clientes
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map(cliente => cliente.verDados())
      .join('\n');
  }

  listarFuncionarios() {
    return this.funcionarios.map(funcionario => funcionario.verDados()).join('\n');
  }

  listarProdutos() {
    return this.produtos
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map(produto => produto.verDados())
      .join('\n');
  }

  listarPedidos() {
    return this.pedidos
      .sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido))
      .map(pedido => pedido.verDados())
      .join('\n');
  }

  // Realiza o login de um usuário com base no email e senha fornecidos
  login(email, senha) {
    const usuario = [...this.clientes, ...this.funcionarios].find(user => user.email === email && user.senha === senha);
    if (usuario) {
      this.usuarioLogado = usuario;
      return `Login bem-sucedido: ${usuario.nome || usuario.nomeUsuario}`;
    } else {
      return 'Email ou senha inválidos.';
    }
  }
  
  // Realiza o logout
  logout() {
    this.usuarioLogado = null;
    return 'Logout realizado com sucesso.';
  }

  verMeusDados() {
    return this.usuarioLogado.verDados();
  }

  modificarMeusDados(novosDados) {
    if (this.usuarioLogado) {
      this.usuarioLogado.modificarDados(novosDados);
      return 'Dados modificados com sucesso.';
    } else {
      return 'Nenhum usuário logado.';
    }
  }
  
  // Modifica os status de um pedido
  modificarStatusPedido(idPedido, novoStatus) {
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido) {
      pedido.modificarStatus(novoStatus);
      return `Status do pedido ${idPedido} modificado para ${novoStatus}.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado.`;
    }
  }

  // Edita os dados de um produto com base no ID do produto
  editarProduto(idProduto, novosDados) {
    const produto = this.produtos.find(produto => produto.id === idProduto);
    if (produto) {
      produto.modificarDados(novosDados);
      return `Produto ${idProduto} editado com sucesso.`;
    } else {
      return `Produto com ID ${idProduto} não encontrado.`;
    }
  }

  excluirProduto(idProduto) {
    const index = this.produtos.findIndex(produto => produto.id === idProduto);
    if (index !== -1) {
      this.produtos.splice(index, 1);
      return `Produto ${idProduto} excluído com sucesso.`;
    } else {
      return `Produto com ID ${idProduto} não encontrado.`;
    }
  }
 
  // Adiciona um novo pedido a lista de pedidos
  fazerPedido(pedido) {
    this.pedidos.push(pedido);
    return `Pedido ${pedido.id} realizado com sucesso.`;
  }
  
  // Cancela um pedido se ele existir
  cancelarPedido(idPedido) {
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido && pedido.status === 'pendente') {
      pedido.modificarStatus('cancelado');
      return `Pedido ${idPedido} cancelado com sucesso.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado ou já está finalizado.`;
    }
  }

  verPedidosCliente(idCliente) {
    const pedidosCliente = this.pedidos.filter(pedido => pedido.idCliente === idCliente);
    return pedidosCliente.map(pedido => pedido.verDados()).join('\n');
  }

  // Adiciona uma avaliação
  avaliarPedido(idPedido, avaliacao) {
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido) {
      pedido.avaliacao = avaliacao;
      return `Pedido ${idPedido} avaliado com sucesso.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado.`;
    }
  }

  verAvaliacoes() {
    return this.pedidos.filter(pedido => pedido.avaliacao).map(pedido => `Pedido ID: ${pedido.id}, Avaliação: ${pedido.avaliacao}`).join('\n');
  }
}

module.exports = Sistema;
