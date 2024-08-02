// Importando as classes que vão ser utilizadas
const Cliente = require('./classes/Cliente');
const Funcionario = require('./classes/Funcionario');
const Produto = require('./classes/Produto');
const Pedido = require('./classes/Pedido');
const Sistema = require('./classes/Sistema');

// Interface
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const sistema = new Sistema();

// Adicionando dados de exemplo
// Dados cliente
const cliente1 = new Cliente(1, 'Tadeu Silva', '03/05/2004', '111.111.111-11', 'tadeu@gmail.com', 'senha');
const cliente2 = new Cliente(2, 'Alice Souza', '15/03/1985', '999.999.999-99', 'tadeu@gmail.com', 'password');
sistema.adicionarCliente(cliente1);
sistema.adicionarCliente(cliente2);

// Dados funcionário
const funcionario1 = new Funcionario(1, 'admin', '000.000.000-00', 'admin@gmail.com', 'senhanova');
const funcionario2 = new Funcionario(2, 'func1', '333.333.333-33', 'func1@gmail.com', 'senhaantiga');
sistema.adicionarFuncionario(funcionario1);
sistema.adicionarFuncionario(funcionario2);

// Dados produto
const produto1 = new Produto(1, 'Alcatra', 'Alcatra Mal-passada', '2024-12-31', 45.00, 10);
const produto2 = new Produto(2, 'Pizza', 'Pizza de Strogonoff', '2024-12-31', 20.00, 15);
sistema.adicionarProduto(produto1);
sistema.adicionarProduto(produto2);

// Dados pedido
const pedido1 = new Pedido(1, 1, 'pendente', '2024-08-01');
const pedido2 = new Pedido(2, 2, 'realizado', '2024-07-31');
sistema.adicionarPedido(pedido1);
sistema.adicionarPedido(pedido2);

// Dados avaliação
sistema.avaliarPedido(1, 'Ótimo serviço e qualidade dos produtos. Comprarei novamente!');
sistema.avaliarPedido(2, 'Pizza excelente porém a entrega demorou. Pedi reembolso');

// Menu para usuário não logado
function menuNaoLogado() {
  console.log('\nRestaurante Sabor & Arte \n(Você ainda não está logado!)');
  console.log('1. Login');
  console.log('2. Cadastro');
  console.log('3. Sair do aplicativo');
  readline.question('Escolha uma opção: ', opcao => {
    switch (opcao) {
      case '1':
        // Opção de login
        readline.question('Email: ', email => {
          readline.question('Senha: ', senha => {
            console.log(sistema.login(email, senha));
            menuPrincipal();
          });
        });
        break;
      case '2':
        // OPção de cadastro
        readline.question('Tipo de Cadastro (cliente/funcionario): ', tipo => {
          if (tipo === 'cliente') {
            readline.question('Nome: ', nome => {
              readline.question('Data de Nascimento: ', dataNascimento => {
                readline.question('CPF: ', cpf => {
                  readline.question('Email: ', email => {
                    readline.question('Senha: ', senha => {
                      const id = sistema.clientes.length + 1;
                      const cliente = new Cliente(id, nome, dataNascimento, cpf, email, senha);
                      sistema.adicionarCliente(cliente);
                      console.log('Cadastro de cliente realizado com sucesso.');
                      menuNaoLogado();
                    });
                  });
                });
              });
            });
          } else if (tipo === 'funcionario') {
            // Cadastro de funcionario
            readline.question('Nome de Usuário: ', nomeUsuario => {
              readline.question('CPF: ', cpf => {
                readline.question('Email: ', email => {
                  readline.question('Senha: ', senha => {
                    const id = sistema.funcionarios.length + 1;
                    const funcionario = new Funcionario(id, nomeUsuario, cpf, email, senha);
                    sistema.adicionarFuncionario(funcionario);
                    console.log('Cadastro de funcionário realizado com sucesso.');
                    menuNaoLogado();
                  });
                });
              });
            });
          } else {
            console.log('Tipo de cadastro inválido.');
            menuNaoLogado();
          }
        });
        break;
      case '3':
        // Opção de sair do aplicativo
        readline.close();
        break;
      default:
        console.log('Opção inválida.');
        menuNaoLogado();
    }
  });
}

function menuPrincipal() {
  if (!sistema.usuarioLogado) {
    menuNaoLogado();
  } else if (sistema.usuarioLogado instanceof Cliente) {
    menuClienteLogado();
  } else if (sistema.usuarioLogado instanceof Funcionario) {
    menuFuncionarioLogado();
  }
}

// Menu para cliente logado
function menuClienteLogado() {
  console.log('\n--- Menu Cliente Logado ---');
  console.log('1. Ver Meus Dados');
  console.log('2. Modificar Meus Dados');
  console.log('3. Ver Lista de Produtos');
  console.log('4. Fazer Pedido');
  console.log('5. Cancelar Pedido');
  console.log('6. Ver Meus Pedidos');
  console.log('7. Avaliar Pedido');
  console.log('8. Visualizar Avaliações');
  console.log('9. Logout');
  readline.question('Escolha uma opção: ', opcao => {
    switch (opcao) {
      case '1':
        // Ver dados do cliente
        console.log(sistema.verMeusDados());
        menuClienteLogado();
        break;
      case '2':
        // Modificar dados do cliente
        readline.question('Nome (deixe em branco para não alterar): ', nome => {
          readline.question('Data de Nascimento (deixe em branco para não alterar): ', dataNascimento => {
            readline.question('CPF (deixe em branco para não alterar): ', cpf => {
              readline.question('Email (deixe em branco para não alterar): ', email => {
                readline.question('Senha (deixe em branco para não alterar): ', senha => {
                  const novosDados = { nome, dataNascimento, cpf, email, senha };
                  console.log(sistema.modificarMeusDados(novosDados));
                  menuClienteLogado();
                });
              });
            });
          });
        });
        break;
      case '3':
        // Ver lista de produtos
        console.log('Lista de produtos em ordem alfabética:\n')
        console.log(sistema.listarProdutos());
        menuClienteLogado();
        break;
      case '4':
        // Fazer pedido
        readline.question('ID do Produto: ', idProduto => {
          const produto = sistema.produtos.find(prod => prod.id == idProduto);
          if (produto) {
            const idPedido = sistema.pedidos.length + 1;
            const idCliente = sistema.usuarioLogado.id;
            const pedido = new Pedido(idPedido, idCliente, 'pendente', new Date().toISOString().split('T')[0]);
            sistema.fazerPedido(pedido);
            console.log('Pedido realizado com sucesso.');
          } else {
            console.log('Produto não encontrado.');
          }
          menuClienteLogado();
        });
        break;
      case '5':
        // Cancelar pedido
        readline.question('ID do Pedido: ', idPedido => {
          console.log(sistema.cancelarPedido(Number(idPedido)));
          menuClienteLogado();
        });
        break;
      case '6':
        // Ver lista de pedidos do cliente
        console.log('Lista de pedidos em ordem cronológica (do mais recente pro mais antigo): \n')
        console.log(sistema.verPedidosCliente(sistema.usuarioLogado.id));
        menuClienteLogado();
        break;
      case '7':
        // Avaliar pedido
        readline.question('ID do Pedido: ', idPedido => {
          readline.question('Avaliação: ', avaliacao => {
            console.log(sistema.avaliarPedido(Number(idPedido), avaliacao));
            menuClienteLogado();
          });
        });
        break;
      case '8':
        // Visualizar avaliações
        console.log(sistema.verAvaliacoes());
        menuClienteLogado();
        break;
      case '9':
        // Logout
        console.log(sistema.logout());
        menuPrincipal();
        break;
      default:
        console.log('Opção inválida.');
        menuClienteLogado();
    }
  });
}

// Menu para funcionário logado
function menuFuncionarioLogado() {
  console.log('\n--- Menu Funcionário Logado ---');
  console.log('1. Ver Meus Dados');
  console.log('2. Modificar Meus Dados');
  console.log('3. Ver Lista de Pedidos');
  console.log('4. Ver Lista de Produtos');
  console.log('5. Ver Lista de Clientes');
  console.log('6. Mudar Status do Pedido');
  console.log('7. Adicionar Produto');
  console.log('8. Editar Produto');
  console.log('9. Excluir Produto');
  console.log('10. Logout');
  readline.question('Escolha uma opção: ', opcao => {
    switch (opcao) {
      case '1':
        // Ver dados do funcionario
        console.log(sistema.verMeusDados());
        menuFuncionarioLogado();
        break;
      case '2':
        // Modificar dados do funcionario
        readline.question('Nome de Usuário (deixe em branco para não alterar): ', nomeUsuario => {
          readline.question('CPF (deixe em branco para não alterar): ', cpf => {
            readline.question('Email (deixe em branco para não alterar): ', email => {
              readline.question('Senha (deixe em branco para não alterar): ', senha => {
                const novosDados = { nomeUsuario, cpf, email, senha };
                console.log(sistema.modificarMeusDados(novosDados));
                menuFuncionarioLogado();
              });
            });
          });
        });
        break;
      case '3':
        // Ver lista de pedidos
        console.log('Lista de pedidos em ordem cronológica (do mais recente pro mais antigo): \n')
        console.log(sistema.listarPedidos());
        menuFuncionarioLogado();
        break;
      case '4':
        // Ver lista de produtos
        console.log('Lista de produtos em ordem alfabética:\n')
        console.log(sistema.listarProdutos());
        menuFuncionarioLogado();
        break;
      case '5':
        // Ver lista de clientes
        console.log('Lista de clientes em ordem alfabética:\n')
        console.log(sistema.listarClientes());
        menuFuncionarioLogado();
        break;
      case '6':
        // Mudar status do pedido
        readline.question('ID do Pedido: ', idPedido => {
          readline.question('Novo Status: ', novoStatus => {
            console.log(sistema.modificarStatusPedido(Number(idPedido), novoStatus));
            menuFuncionarioLogado();
          });
        });
        break;
      case '7':
        // Adicionar produto
        readline.question('Nome: ', nome => {
          readline.question('Descrição: ', descricao => {
            readline.question('Data de Validade: ', dataValidade => {
              readline.question('Preço: ', preco => {
                readline.question('Quantidade: ', quantidade => {
                  const id = sistema.produtos.length + 1;
                  const produto = new Produto(id, nome, descricao, dataValidade, Number(preco), Number(quantidade));
                  sistema.adicionarProduto(produto);
                  console.log('Produto adicionado com sucesso.');
                  menuFuncionarioLogado();
                });
              });
            });
          });
        });
        break;
      case '8':
        // Editar produto
        readline.question('ID do Produto: ', idProduto => {
          readline.question('Nome (deixe em branco para não alterar): ', nome => {
            readline.question('Descrição (deixe em branco para não alterar): ', descricao => {
              readline.question('Data de Validade (deixe em branco para não alterar): ', dataValidade => {
                readline.question('Preço (deixe em branco para não alterar): ', preco => {
                  readline.question('Quantidade (deixe em branco para não alterar): ', quantidade => {
                    const novosDados = { nome, descricao, dataValidade, preco: Number(preco), quantidade: Number(quantidade) };
                    console.log(sistema.editarProduto(Number(idProduto), novosDados));
                    menuFuncionarioLogado();
                  });
                });
              });
            });
          });
        });
        break;
      case '9':
        // Excluir produto
        readline.question('ID do Produto: ', idProduto => {
          console.log(sistema.excluirProduto(Number(idProduto)));
          menuFuncionarioLogado();
        });
        break;
      case '10':
        // Logout
        console.log(sistema.logout());
        menuPrincipal();
        break;
      default:
        console.log('Opção inválida.');
        menuFuncionarioLogado();
    }
  });
}

menuPrincipal();
