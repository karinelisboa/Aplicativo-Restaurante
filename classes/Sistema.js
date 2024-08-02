// Importa as classes que vão ser utilizadas
const Cliente = require('./Cliente');
const Pedido = require('./Pedido');
const Funcionario = require('./Funcionario');
const Produto = require('./Produto');

class Sistema {
    // Constroi a classe Sistema que será responsável por gerenciar as interações
  constructor() {
    this.clientes = [];
    this.funcionarios = [];
    this.pedidos = [];
    this.produtos = [];
    this.usuarioLogado = null;
  }
  // Adiciona um novo cliente ao sistema e outros metodos semelhantes
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
  // Lista os clientes em ordem alfabetica
  listarClientes() {
    return this.clientes
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map(cliente => cliente.verDados())
      .join('\n');
  }
  // Lista os funcionários
  listarFuncionarios() {
    return this.funcionarios.map(funcionario => funcionario.verDados()).join('\n');
  }
  // Lista os produtos em ordem alfabetica
  listarProdutos() {
    return this.produtos
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map(produto => produto.verDados())
      .join('\n');
  }
  // Lista os pedidos em ordem cronologica
  listarPedidos() {
    return this.pedidos
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .map(pedido => pedido.verDados())
      .join('\n');
  }

  // Permite que um usuário faça login no sistema
  login(email, senha) {
    // Busca o usuário com o email e senha fornecidos
    // Se o usuário for encontrado, define o usuário como logado
    const usuario = [...this.clientes, ...this.funcionarios].find(user => user.email === email && user.senha === senha);
    if (usuario) {
      this.usuarioLogado = usuario;
      return `Login bem-sucedido: ${usuario.nome || usuario.nomeUsuario}`;
    } else {
      return 'Email ou senha inválidos.';
    }
  }
  // Permite que o usuário faça logout do sistema
  logout() {
    this.usuarioLogado = null;
    return 'Logout realizado com sucesso.';
  }
  // Permite que o usuário veja seus próprios dados
  verMeusDados() {
    return this.usuarioLogado.verDados();
  }
  
  // Abaixo são metodos que permitem o usuário modificar algo
  modificarMeusDados(novosDados) {
    if (this.usuarioLogado) {
      this.usuarioLogado.modificarDados(novosDados);
      return 'Dados modificados com sucesso.';
    } else {
      return 'Nenhum usuário logado.';
    }
  }

  modificarStatusPedido(idPedido, novoStatus) {
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido) {
      pedido.modificarStatus(novoStatus);
      return `Status do pedido ${idPedido} modificado para ${novoStatus}.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado.`;
    }
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }
  // Edita as informações de um produto existente
  editarProduto(idProduto, novosDados) {
    // Busca o produto pelo ID e atualiza seus dados
    const produto = this.produtos.find(produto => produto.id === idProduto);
    if (produto) {
      produto.modificarDados(novosDados);
      return `Produto ${idProduto} editado com sucesso.`;
    } else {
      return `Produto com ID ${idProduto} não encontrado.`;
    }
  }

  excluirProduto(idProduto) {
    // Busca o produto pelo ID e remove-o do array de produtos
    const index = this.produtos.findIndex(produto => produto.id === idProduto);
    if (index !== -1) {
      this.produtos.splice(index, 1);
      return `Produto ${idProduto} excluído com sucesso.`;
    } else {
      return `Produto com ID ${idProduto} não encontrado.`;
    }
  }
  // Permite que um cliente faça um novo pedido
  fazerPedido(pedido) {
    // Adiciona o pedido ao array de pedidos
    this.pedidos.push(pedido);
    return `Pedido ${pedido.id} realizado com sucesso.`;
  }
  // Permite que um cliente cancele um pedido pendente
  cancelarPedido(idPedido) {
    // Busca o pedido pelo ID e atualiza seus status para 'cancelado'.
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido && pedido.status === 'pendente') {
      pedido.modificarStatus('cancelado');
      return `Pedido ${idPedido} cancelado com sucesso.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado ou já está finalizado.`;
    }
  }
  // Permite que um cliente veja seus pedidos
  verPedidosCliente(idCliente) {
    // FIltra os pedidos por ID do cliente e retorna os dados dos pedidos
    const pedidosCliente = this.pedidos.filter(pedido => pedido.idCliente === idCliente);
    return pedidosCliente.map(pedido => pedido.verDados()).join('\n');
  }
  // Permite que um cliente avalie um pedido
  avaliarPedido(idPedido, avaliacao) {
    // Busca o pedido pelo ID e adiciona a avalização
    const pedido = this.pedidos.find(pedido => pedido.id === idPedido);
    if (pedido) {
      pedido.avaliacao = avaliacao;
      return `Pedido ${idPedido} avaliado com sucesso.`;
    } else {
      return `Pedido com ID ${idPedido} não encontrado.`;
    }
  }
  // Retorna um lista com todas as avaliações dos pedidos
  verAvaliacoes() {
    // Filtra os pedidos com avaliações e retorna as informações
    return this.pedidos.filter(pedido => pedido.avaliacao).map(pedido => `Pedido ID: ${pedido.id}, Avaliação: ${pedido.avaliacao}`).join('\n');
  }
}

module.exports = Sistema;
