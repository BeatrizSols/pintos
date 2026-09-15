/*
  imagens.js
  Gera a lista de todos os produtos com um espaço reservado para a foto
  e o caminho exato do arquivo esperado em assets/img/produtos/.
  O campo "Escolher imagem" só gera uma prévia local (no navegador),
  não envia nem salva o arquivo — o sistema não possui backend.
*/

function criarCartaoImagem(produto) {
  const cartao = document.createElement("div");
  cartao.className = "cartao-imagem";

  cartao.innerHTML =
    '<div class="pre-visualizacao">' +
      '<img src="' + produto.imagem + '" alt="' + produto.nome + '" ' +
      'onerror="this.replaceWith(criarSemImagemLocal())">' +
    '</div>' +
    '<h3>' + produto.nome + '</h3>' +
    '<p class="categoria-produto">' + produto.categoria + '</p>' +
    '<p class="caminho-arquivo">' + produto.imagem + '</p>' +
    '<input type="file" accept="image/*">';

  const campoArquivo = cartao.querySelector('input[type="file"]');
  const areaPreVisualizacao = cartao.querySelector(".pre-visualizacao");

  campoArquivo.addEventListener("change", function () {
    const arquivo = campoArquivo.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function (evento) {
      areaPreVisualizacao.innerHTML = '<img src="' + evento.target.result + '" alt="' + produto.nome + '">';
    };
    leitor.readAsDataURL(arquivo);
  });

  return cartao;
}

function criarSemImagemLocal() {
  const div = document.createElement("div");
  div.className = "sem-imagem";
  div.textContent = "Sem imagem";
  return div;
}
window.criarSemImagemLocal = criarSemImagemLocal;

function renderizarListaImagens(categoria) {
  const lista = document.getElementById("lista-imagens");
  lista.innerHTML = "";

  const produtosFiltrados = categoria === "Todos"
    ? produtos
    : produtos.filter(function (p) { return p.categoria === categoria; });

  produtosFiltrados.forEach(function (produto) {
    lista.appendChild(criarCartaoImagem(produto));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarListaImagens("Todos");

  document.getElementById("filtro-categoria-imagens").addEventListener("change", function (evento) {
    renderizarListaImagens(evento.target.value);
  });
});
