/*
  cardapio.js
  Lógica da página cardapio.html: montagem dos cards, pesquisa, filtro,
  carrinho de pedido e as telas de identificação, resumo, pagamento e
  confirmação. Tudo dentro da mesma página (nenhuma categoria abre uma
  página nova).
*/

let carrinho = [];
let taxaGarcomAtiva = false;
let dadosCliente = { nome: "", mesa: "" };
let formaPagamentoEscolhida = "";

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

/* ---------- Montagem dos cards de produto ---------- */

function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "cartao-produto";

  card.innerHTML =
    '<div class="imagem-produto">' +
      '<img src="assets/img/logo-restaurante.jpg" alt="' + produto.nome + '">' +
    '</div>' +
    '<div class="info-produto">' +
      '<h3>' + produto.nome + '</h3>' +
      '<p class="descricao-produto">' + produto.descricao + '</p>' +
      '<p class="preco-produto">' + formatarPreco(produto.preco) + '</p>' +
      '<button type="button">Adicionar ao pedido</button>' +
    '</div>';

  card.querySelector("button").addEventListener("click", function () {
    adicionarAoPedido(produto.id);
  });

  return card;
}

function renderizarCategorias(listaProdutos) {
  document.querySelectorAll(".grade-produtos[data-categoria]").forEach(function (grade) {
    const categoria = grade.getAttribute("data-categoria");
    grade.innerHTML = "";
    const produtosCategoria = listaProdutos.filter(function (p) {
      return p.categoria === categoria;
    });
    produtosCategoria.forEach(function (produto) {
      grade.appendChild(criarCardProduto(produto));
    });
  });
}

function renderizarResultados(listaProdutos) {
  const grade = document.getElementById("grade-resultados");
  grade.innerHTML = "";
  listaProdutos.forEach(function (produto) {
    grade.appendChild(criarCardProduto(produto));
  });
}

/* ---------- Pesquisa e filtro ---------- */

function aplicarFiltros() {
  const termo = document.getElementById("campo-pesquisa").value.trim().toLowerCase();
  const categoriaFiltro = document.getElementById("filtro-categoria").value;

  const secaoResultados = document.getElementById("secao-resultados");
  const secoesCategorias = document.getElementById("secoes-categorias");
  const menuCategorias = document.getElementById("menu-categorias");
  const mensagemSemResultado = document.getElementById("mensagem-sem-resultado");

  if (termo !== "") {
    // Modo pesquisa: mostra um único grid com o resultado
    let resultado = produtos.filter(function (p) {
      return p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo);
    });

    if (categoriaFiltro !== "Todos") {
      resultado = resultado.filter(function (p) {
        return p.categoria === categoriaFiltro;
      });
    }

    secoesCategorias.hidden = true;
    menuCategorias.hidden = true;
    secaoResultados.hidden = false;
    mensagemSemResultado.hidden = resultado.length > 0;

    renderizarResultados(resultado);
  } else {
    // Modo navegação normal por categorias
    secaoResultados.hidden = true;
    menuCategorias.hidden = false;
    secoesCategorias.hidden = false;
    mensagemSemResultado.hidden = true;

    document.querySelectorAll(".secao-categoria[id^='secao-']").forEach(function (secao) {
      if (secao.id === "secao-resultados") return;
      const categoriaDaSecao = secao.querySelector(".grade-produtos").getAttribute("data-categoria");
      secao.style.display = (categoriaFiltro === "Todos" || categoriaFiltro === categoriaDaSecao) ? "" : "none";
    });

    renderizarCategorias(produtos);
  }
}

/* ---------- Carrinho ---------- */

function adicionarAoPedido(idProduto) {
  const itemExistente = carrinho.find(function (item) {
    return item.id === idProduto;
  });

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ id: idProduto, quantidade: 1 });
  }

  atualizarContadorPedido();
}

function alterarQuantidade(idProduto, diferenca) {
  const item = carrinho.find(function (i) {
    return i.id === idProduto;
  });
  if (!item) return;

  item.quantidade += diferenca;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(function (i) {
      return i.id !== idProduto;
    });
  }

  atualizarContadorPedido();
  renderizarPedido();
}

function removerItem(idProduto) {
  carrinho = carrinho.filter(function (i) {
    return i.id !== idProduto;
  });
  atualizarContadorPedido();
  renderizarPedido();
}

function atualizarContadorPedido() {
  const totalItens = carrinho.reduce(function (soma, item) {
    return soma + item.quantidade;
  }, 0);
  document.getElementById("botao-meu-pedido").textContent = "MEU PEDIDO (" + totalItens + ")";
}

function calcularSubtotal() {
  return carrinho.reduce(function (soma, item) {
    const produto = produtos.find(function (p) {
      return p.id === item.id;
    });
    return soma + produto.preco * item.quantidade;
  }, 0);
}

function calcularTaxaGarcom(subtotal) {
  return taxaGarcomAtiva ? subtotal * 0.10 : 0;
}

/* ---------- Tela: Meu Pedido ---------- */

function renderizarPedido() {
  const lista = document.getElementById("lista-pedido");
  const mensagemVazio = document.getElementById("pedido-vazio");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    mensagemVazio.hidden = false;
  } else {
    mensagemVazio.hidden = true;
  }

  carrinho.forEach(function (item) {
    const produto = produtos.find(function (p) {
      return p.id === item.id;
    });

    const linha = document.createElement("div");
    linha.className = "item-pedido";
    linha.innerHTML =
      '<div class="nome-item"><strong>' + produto.nome + '</strong>' +
      '<span>' + formatarPreco(produto.preco) + ' cada</span></div>' +
      '<div class="controle-quantidade">' +
        '<button type="button" class="botao-diminuir">-</button>' +
        '<span>' + item.quantidade + '</span>' +
        '<button type="button" class="botao-aumentar">+</button>' +
      '</div>' +
      '<div class="valor-item">' + formatarPreco(produto.preco * item.quantidade) + '</div>' +
      '<button type="button" class="botao-remover">Remover</button>';

    linha.querySelector(".botao-aumentar").addEventListener("click", function () {
      alterarQuantidade(item.id, 1);
    });
    linha.querySelector(".botao-diminuir").addEventListener("click", function () {
      alterarQuantidade(item.id, -1);
    });
    linha.querySelector(".botao-remover").addEventListener("click", function () {
      removerItem(item.id);
    });

    lista.appendChild(linha);
  });

  atualizarValoresPedido();
}

function atualizarValoresPedido() {
  const subtotal = calcularSubtotal();
  const garcom = calcularTaxaGarcom(subtotal);
  const total = subtotal + garcom;

  document.getElementById("valor-subtotal").textContent = formatarPreco(subtotal);
  document.getElementById("valor-garcom").textContent = formatarPreco(garcom);
  document.getElementById("valor-total").textContent = formatarPreco(total);

  document.getElementById("botao-finalizar-pedido").disabled = carrinho.length === 0;
}

/* ---------- Navegação entre telas ---------- */

function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(function (tela) {
    tela.hidden = true;
  });
  document.getElementById(idTela).hidden = false;
  window.scrollTo(0, 0);
}

/* ---------- Montagem de listas de itens (resumo / confirmação) ---------- */

function montarListaItens(container) {
  container.innerHTML = "";
  carrinho.forEach(function (item) {
    const produto = produtos.find(function (p) {
      return p.id === item.id;
    });
    const linha = document.createElement("div");
    linha.className = "item-pedido";
    linha.innerHTML =
      '<div class="nome-item"><strong>' + produto.nome + '</strong>' +
      '<span>Quantidade: ' + item.quantidade + '</span></div>' +
      '<div class="valor-item">' + formatarPreco(produto.preco * item.quantidade) + '</div>';
    container.appendChild(linha);
  });
}

/* ---------- Eventos ---------- */

document.addEventListener("DOMContentLoaded", function () {
  renderizarCategorias(produtos);

  document.getElementById("campo-pesquisa").addEventListener("input", aplicarFiltros);
  document.getElementById("filtro-categoria").addEventListener("change", aplicarFiltros);

  document.getElementById("botao-meu-pedido").addEventListener("click", function () {
    renderizarPedido();
    mostrarTela("tela-pedido");
  });

  document.getElementById("botao-voltar-cardapio").addEventListener("click", function () {
    mostrarTela("tela-cardapio");
  });

  document.getElementById("checkbox-garcom").addEventListener("change", function (evento) {
    taxaGarcomAtiva = evento.target.checked;
    atualizarValoresPedido();
  });

  document.getElementById("botao-finalizar-pedido").addEventListener("click", function () {
    mostrarTela("tela-identificacao");
  });

  document.getElementById("botao-voltar-pedido").addEventListener("click", function () {
    mostrarTela("tela-pedido");
  });

  document.getElementById("formulario-identificacao").addEventListener("submit", function (evento) {
    evento.preventDefault();
    dadosCliente.nome = document.getElementById("campo-nome-cliente").value.trim();
    dadosCliente.mesa = document.getElementById("campo-mesa").value.trim();

    document.getElementById("resumo-nome").textContent = dadosCliente.nome;
    document.getElementById("resumo-mesa").textContent = dadosCliente.mesa;
    montarListaItens(document.getElementById("resumo-itens"));

    const subtotal = calcularSubtotal();
    const garcom = calcularTaxaGarcom(subtotal);
    const total = subtotal + garcom;
    document.getElementById("resumo-subtotal").textContent = formatarPreco(subtotal);
    document.getElementById("resumo-garcom").textContent = formatarPreco(garcom);
    document.getElementById("resumo-total").textContent = formatarPreco(total);

    mostrarTela("tela-resumo");
  });

  document.getElementById("botao-voltar-identificacao").addEventListener("click", function () {
    mostrarTela("tela-identificacao");
  });

  document.getElementById("botao-continuar-pagamento").addEventListener("click", function () {
    const subtotal = calcularSubtotal();
    const garcom = calcularTaxaGarcom(subtotal);
    const total = subtotal + garcom;
    document.getElementById("pagamento-total").textContent = formatarPreco(total);
    mostrarTela("tela-pagamento");
  });

  document.getElementById("botao-voltar-resumo").addEventListener("click", function () {
    mostrarTela("tela-resumo");
  });

  document.getElementById("botao-confirmar-pedido").addEventListener("click", function () {
    const opcaoSelecionada = document.querySelector('input[name="pagamento"]:checked');
    if (!opcaoSelecionada) {
      alert("Selecione uma forma de pagamento.");
      return;
    }
    formaPagamentoEscolhida = opcaoSelecionada.value;

    document.getElementById("confirmacao-nome").textContent = dadosCliente.nome;
    document.getElementById("confirmacao-mesa").textContent = dadosCliente.mesa;
    montarListaItens(document.getElementById("confirmacao-itens"));

    const subtotal = calcularSubtotal();
    const garcom = calcularTaxaGarcom(subtotal);
    const total = subtotal + garcom;
    document.getElementById("confirmacao-total").textContent = formatarPreco(total);
    document.getElementById("confirmacao-pagamento").textContent = formaPagamentoEscolhida;

    mostrarTela("tela-confirmacao");
  });

  document.getElementById("botao-voltar-inicio").addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
