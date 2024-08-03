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
        // Opção de cadastro
        readline.question('Tipo de Cadastro (cliente/funcionario): ', tipo => {
          if (tipo === 'cliente') {
            readline.question('Nome: ', nome => {
              // COnfere se a data de nascimento está no formato xx/xx/xxxxx
              readline.question('Data de Nascimento (xx/xx/xxxx): ', dataNascimento => {
                if (!Sistema.validarData(dataNascimento)) {
                  console.log('Data de nascimento inválida.');
                  return menuNaoLogado();
                }
                // Confere se o CPF está no formato xxx.xxx.xxx-xx
                readline.question('CPF (xxx.xxx.xxx-xx): ', cpf => {
                  if (!Sistema.validarCPF(cpf)) {
                    console.log('CPF inválido.');
                    return menuNaoLogado();
                  }
                  // Confere se a entrada o email tem @
                  readline.question('Email (xxx@xxx): ', email => {
                    if (!Sistema.validarEmail(email)) {
                      console.log('Email inválido.');
                      return menuNaoLogado();
                    }
                    // Confere se a senha tem mais de 6 caracteres
                    readline.question('Senha (deve ter mais de 6 caracteres): ', senha => {
                      if (!Sistema.validarSenha(senha)) {
                        console.log('Senha inválida.');
                        return menuNaoLogado();
                      }
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
            // Cadastro de funcionário
            readline.question('Nome de Usuário: ', nomeUsuario => {
              // Confere se o CPF está no formato xxx.xxx.xxx-xx
              readline.question('CPF (xxx.xxx.xxx-xx): ', cpf => {
                if (!Sistema.validarCPF(cpf)) {
                  console.log('CPF inválido.');
                  return menuNaoLogado();
                }
                // Confere se a entrada o email tem @
                readline.question('Email (xxx@xxx): ', email => {
                  if (!Sistema.validarEmail(email)) {
                    console.log('Email inválido.');
                    return menuNaoLogado();
                  }
                  // Confere se a senha tem mais de 6 caracteres
                  readline.question('Senha (deve ter mais de 6 caracteres): ', senha => {
                    if (!Sistema.validarSenha(senha)) {
                      console.log('Senha inválida.');
                      return menuNaoLogado();
                    }
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
  console.log('\nRestaurante Sabor & Arte \n(Cliente logado)');
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
          // Valida se a data está no formato adequado
          readline.question('Data de Nascimento (deixe em branco para não alterar, formato xx/xx/xxxx): ', dataNascimento => {
            if (dataNascimento && !Sistema.validarData(dataNascimento)) {
              console.log('Data de nascimento inválida.');
              return menuClienteLogado();
            }
            // Valida se o CPF está no formato adequado
            readline.question('CPF (deixe em branco para não alterar, formato 000.000.000-00): ', cpf => {
              if (cpf && !Sistema.validarCPF(cpf)) {
                console.log('CPF inválido.');
                return menuClienteLogado();
              }
              // Valida se o email está no formato adequado
              readline.question('Email (deixe em branco para não alterar): ', email => {
                if (email && !Sistema.validarEmail(email)) {
                  console.log('Email inválido.');
                  return menuClienteLogado();
                }
                // Valida se a senha tem mais de 6 caracteres
                readline.question('Senha (mais de 6 caracteres, deixe em branco para não alterar): ', senha => {
                  if (senha && !Sistema.validarSenha(senha)) {
                    console.log('Senha inválida.');
                    return menuClienteLogado();
                  }
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
        console.log('Lista de produtos em ordem alfabética:\n');
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
          if (isNaN(idPedido) || Number(idPedido) <= 0) {
            console.log('ID de pedido inválido.');
            return menuClienteLogado();
          }
          console.log(sistema.cancelarPedido(Number(idPedido)));
          menuClienteLogado();
        });
        break;
      case '6':
        // Ver lista de pedidos do cliente
        console.log('Lista de pedidos em ordem cronológica (do mais recente para o mais antigo):\n');
        console.log(sistema.verPedidosCliente(sistema.usuarioLogado.id));
        menuClienteLogado();
        break;
      case '7':
        // Avaliar pedido
        readline.question('ID do Pedido: ', idPedido => {
          if (isNaN(idPedido) || Number(idPedido) <= 0) {
            console.log('ID de pedido inválido.');
            return menuClienteLogado();
          }
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
  console.log('\nRestaurante Sabor & Arte \n(Funcionário logado)');
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
        // Ver dados do funcionário
        console.log(sistema.verMeusDados());
        menuFuncionarioLogado();
        break;
      case '2':
        // Modificar dados do funcionário
        readline.question('Nome de Usuário (deixe em branco para não alterar): ', nomeUsuario => {
          // Valida se o CPF está no formato certo
          readline.question('CPF (deixe em branco para não alterar, formato 000.000.000-00): ', cpf => {
            if (cpf && !Sistema.validarCPF(cpf)) {
              console.log('CPF inválido.');
              return menuFuncionarioLogado();
            }
            // Valida se o email está no formato certo
            readline.question('Email (deixe em branco para não alterar): ', email => {
              if (email && !Sistema.validarEmail(email)) {
                console.log('Email inválido.');
                return menuFuncionarioLogado();
              }
              // Confere se a senha tem mais de 6 caracteres
              readline.question('Senha (deixe em branco para não alterar): ', senha => {
                if (senha && !Sistema.validarSenha(senha)) {
                  console.log('Senha inválida.');
                  return menuFuncionarioLogado();
                }
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
        console.log('Lista de pedidos em ordem cronológica (do mais recente para o mais antigo):\n');
        console.log(sistema.listarPedidos());
        menuFuncionarioLogado();
        break;
      case '4':
        // Ver lista de produtos
        console.log('Lista de produtos em ordem alfabética:\n');
        console.log(sistema.listarProdutos());
        menuFuncionarioLogado();
        break;
      case '5':
        // Ver lista de clientes
        console.log('Lista de clientes em ordem alfabética:\n');
        console.log(sistema.listarClientes());
        menuFuncionarioLogado();
        break;
      case '6':
        // Mudar status do pedido
        readline.question('ID do Pedido: ', idPedido => {
          if (isNaN(idPedido) || Number(idPedido) <= 0) {
            console.log('ID de pedido inválido.');
            return menuFuncionarioLogado();
          }
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
            readline.question('Data de Validade (xx/xx/xxxx): ', dataValidade => {
              // Confere se a data está em um formato valido
              if (!Sistema.validarData(dataValidade)) {
                console.log('Data de validade inválida.');
                return menuFuncionarioLogado();
              }
              readline.question('Preço: ', preco => {
                if (isNaN(preco) || Number(preco) <= 0) {
                  console.log('Preço inválido.');
                  return menuFuncionarioLogado();
                }
                readline.question('Quantidade: ', quantidade => {
                  if (isNaN(quantidade) || Number(quantidade) <= 0) {
                    console.log('Quantidade inválida.');
                    return menuFuncionarioLogado();
                  }
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
          if (isNaN(idProduto) || Number(idProduto) <= 0) {
            console.log('ID de produto inválido.');
            return menuFuncionarioLogado();
          }
          readline.question('Nome (deixe em branco para não alterar): ', nome => {
            readline.question('Descrição (deixe em branco para não alterar): ', descricao => {
              readline.question('Data de Validade (deixe em branco para não alterar, formato xx/xx/xxxx): ', dataValidade => {
                // Confere se a data está no formato correto
                if (dataValidade && !Sistema.validarData(dataValidade)) {
                  console.log('Data de validade inválida.');
                  return menuFuncionarioLogado();
                }
                readline.question('Preço (deixe em branco para não alterar): ', preco => {
                  const precoNumero = preco ? Number(preco) : undefined;
                  if (preco && (isNaN(precoNumero) || precoNumero <= 0)) {
                    console.log('Preço inválido.');
                    return menuFuncionarioLogado();
                  }
                  readline.question('Quantidade (deixe em branco para não alterar): ', quantidade => {
                    const quantidadeNumero = quantidade ? Number(quantidade) : undefined;
                    if (quantidade && (isNaN(quantidadeNumero) || quantidadeNumero <= 0)) {
                      console.log('Quantidade inválida.');
                      return menuFuncionarioLogado();
                    }
                    const novosDados = { nome, descricao, dataValidade, preco: precoNumero, quantidade: quantidadeNumero };
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
          if (isNaN(idProduto) || Number(idProduto) <= 0) {
            console.log('ID de produto inválido.');
            return menuFuncionarioLogado();
          }
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
