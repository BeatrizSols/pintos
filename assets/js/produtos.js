/*
  produtos.js
  Base de dados do cardápio do Sales Pinto's.
  Cada produto possui: id, nome, descricao, preco, categoria, imagem.
  As imagens usam caminhos reservados em assets/img/produtos/ — basta
  colocar o arquivo com o mesmo nome para a foto aparecer no cardápio.
  (veja também a página imagens.html)
*/

const CATEGORIAS = [
  "Entradas",
  "Prato Principal",
  "Sobremesas",
  "Bebidas",
  "Carta de Vinhos"
];

function slug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const dadosEntradas = [
  ["Bruschetta de Tomate", "Pão italiano tostado com tomate, alho e manjericão.", 24.90],
  ["Bruschetta de Alho", "Fatias de pão italiano com manteiga de alho e ervas.", 22.90],
  ["Carpaccio de Carne", "Finas lâminas de carne com molho de mostarda e alcaparras.", 44.90],
  ["Carpaccio de Salmão", "Lâminas finas de salmão com raspas de limão siciliano.", 48.90],
  ["Bolinho de Bacalhau", "Porção com 8 unidades, acompanha molho tártaro.", 42.90],
  ["Coxinha de Frango", "Porção com 6 unidades de coxinha artesanal.", 29.90],
  ["Pastel de Carne", "Porção com 6 unidades, massa fina e crocante.", 27.90],
  ["Pastel de Queijo", "Porção com 6 unidades, recheio cremoso.", 26.90],
  ["Dadinho de Tapioca", "Cubos de tapioca com queijo coalho e geleia de pimenta.", 32.90],
  ["Isca de Peixe", "Tiras de filé empanadas, acompanha molho tártaro.", 39.90],
  ["Camarão Empanado", "Camarões empanados na casquinha, acompanha molho especial.", 54.90],
  ["Calabresa Acebolada", "Calabresa fatiada com cebola na chapa.", 34.90],
  ["Batata Frita", "Porção generosa de batatas fritas crocantes.", 24.50],
  ["Anéis de Cebola", "Anéis de cebola empanados e fritos.", 28.90],
  ["Polenta Frita", "Palitos de polenta crocantes com molho de tomate.", 25.90],
  ["Queijo Coalho", "Espetinhos de queijo coalho grelhado com mel.", 31.90],
  ["Torresmo", "Porção de torresmo crocante temperado.", 33.90],
  ["Ceviche", "Peixe branco marinado no limão com pimenta e cebola roxa.", 46.90],
  ["Carpaccio de Polvo", "Fatias finas de polvo com azeite e ervas.", 58.90],
  ["Croquete de Carne", "Porção com 8 unidades de croquete de carne seca.", 30.90],
  ["Kibe", "Porção com 8 unidades, recheado com hortelã.", 28.50],
  ["Empanada", "Porção com 4 unidades, massa folhada recheada.", 27.90],
  ["Guacamole com Nachos", "Guacamole fresco acompanhado de nachos crocantes.", 36.90],
  ["Bruschetta de Cogumelos", "Pão italiano com cogumelos salteados e queijo.", 30.90],
  ["Salada Caprese", "Tomate, mussarela de búfala e manjericão com azeite.", 37.90],
  ["Tábua de Frios", "Seleção de queijos e embutidos com torradas.", 52.90],
  ["Pão de Alho", "Porção de pão de alho na chapa.", 21.90],
  ["Escondidinho de Carne Seca", "Purê de mandioca gratinado com carne seca desfiada.", 41.90],
  ["Camarão na Moranga (mini)", "Camarão ao creme servido em mini moranga.", 49.90],
  ["Vol-au-vent de Camarão", "Massa folhada recheada com camarão ao creme.", 43.90]
];

const dadosPrincipais = [
  ["Filé à Parmegiana", "Filé empanado com molho de tomate e queijo gratinado, acompanha arroz e batata frita.", 129.90],
  ["Filé Mignon ao Molho Madeira", "Medalhões de filé mignon ao molho madeira, acompanha arroz e purê.", 149.90],
  ["Picanha Grelhada", "Picanha grelhada ao ponto, acompanha arroz, farofa e vinagrete.", 189.90],
  ["Frango Grelhado", "Peito de frango grelhado, acompanha arroz e legumes salteados.", 119.90],
  ["Frango à Parmegiana", "Filé de frango empanado com molho de tomate e queijo gratinado.", 124.90],
  ["Salmão Grelhado", "Filé de salmão grelhado, acompanha arroz e legumes.", 169.90],
  ["Peixe Grelhado (Tilápia)", "Filé de tilápia grelhado, acompanha arroz e purê de batata.", 139.90],
  ["Camarão ao Molho", "Camarões ao molho de tomate e ervas, acompanha arroz branco.", 179.90],
  ["Risoto de Camarão", "Risoto cremoso de camarão com toque de limão siciliano.", 159.90],
  ["Lasanha à Bolonhesa", "Lasanha tradicional com molho bolonhesa e queijo gratinado.", 109.90],
  ["Espaguete à Bolonhesa", "Espaguete ao molho bolonhesa tradicional.", 104.90],
  ["Fettuccine Alfredo", "Fettuccine ao molho branco cremoso com queijo parmesão.", 114.90],
  ["Penne ao Molho Branco", "Penne ao molho branco com toque de nós-moscada.", 104.90],
  ["Strogonoff de Frango", "Strogonoff cremoso de frango, acompanha arroz e batata palha.", 119.90],
  ["Strogonoff de Carne", "Strogonoff cremoso de carne, acompanha arroz e batata palha.", 134.90],
  ["Bife à Role", "Bife enrolado recheado com presunto e queijo, ao molho.", 144.90],
  ["Costela no Bafo", "Costela bovina cozida lentamente, acompanha mandioca.", 164.90],
  ["Moqueca de Peixe", "Moqueca de peixe com leite de coco e dendê, acompanha arroz e pirão.", 174.90],
  ["Paella", "Paella tradicional com frutos do mar e frango.", 199.90],
  ["Risoto de Funghi", "Risoto cremoso com mix de cogumelos.", 154.90],
  ["Feijoada", "Feijoada completa com acompanhamentos tradicionais.", 129.90],
  ["Bacalhau à Brás", "Bacalhau desfiado com batata palha e ovos.", 209.90],
  ["Polenta com Carne", "Polenta cremosa acompanhada de carne desfiada ao molho.", 114.90],
  ["Medalhão de Mignon", "Medalhões de filé mignon grelhados, acompanha arroz e legumes.", 169.90],
  ["Frango à Milanesa", "Filé de frango empanado, acompanha arroz e purê.", 109.90],
  ["Tilápia à Belle Meunière", "Filé de tilápia ao molho de limão e alcaparras.", 149.90],
  ["Arroz de Polvo", "Arroz cremoso com polvo grelhado.", 219.90],
  ["Camarão à Grega", "Camarões salteados com legumes ao molho leve.", 184.90],
  ["Contra Filé Grelhado", "Contra filé grelhado, acompanha arroz e fritas.", 139.90],
  ["Cupim Assado", "Cupim assado lentamente, acompanha mandioca e farofa.", 179.90]
];

const dadosSobremesas = [
  ["Pudim de Leite", "Pudim de leite condensado tradicional.", 18.90],
  ["Brownie com Sorvete", "Brownie de chocolate quente com bola de sorvete de creme.", 26.90],
  ["Tiramisu", "Sobremesa italiana com café e mascarpone.", 28.90],
  ["Cheesecake de Frutas Vermelhas", "Cheesecake cremoso com calda de frutas vermelhas.", 32.90],
  ["Petit Gâteau", "Bolo quente de chocolate com sorvete de creme.", 34.90],
  ["Mousse de Chocolate", "Mousse de chocolate meio amargo.", 19.90],
  ["Mousse de Maracujá", "Mousse cremoso de maracujá.", 18.90],
  ["Sorvete (2 bolas)", "Duas bolas de sorvete, sabores a escolher.", 15.90],
  ["Banoffee", "Torrada de banana, doce de leite e chantilly.", 24.90],
  ["Brigadeiro Gourmet", "Porção com 4 unidades de brigadeiro artesanal.", 17.90],
  ["Cocada", "Cocada cremosa tradicional.", 12.90],
  ["Doce de Leite com Queijo", "Doce de leite cremoso com queijo minas.", 21.90],
  ["Torta de Limão", "Torta gelada de limão com merengue.", 22.90],
  ["Torta de Morango", "Torta gelada de morango com chantilly.", 23.90],
  ["Pavê de Chocolate", "Pavê tradicional de chocolate.", 19.90],
  ["Quindim", "Doce tradicional de gema e coco.", 14.90],
  ["Bolo de Cenoura com Chocolate", "Fatia de bolo de cenoura com cobertura de chocolate.", 16.90],
  ["Romeu e Julieta", "Goiabada com fatias de queijo minas.", 17.90],
  ["Sagu com Creme", "Sagu ao vinho tinto com creme de baunilha.", 15.90],
  ["Crème Brûlée", "Creme de baunilha com cobertura de açúcar caramelizado.", 29.90],
  ["Panna Cotta", "Panna cotta italiana com calda de frutas vermelhas.", 27.90],
  ["Sorvete de Creme com Calda", "Sorvete de creme com calda de chocolate ou caramelo.", 16.90],
  ["Torta Holandesa", "Fatia de torta holandesa gelada.", 20.90],
  ["Bolo de Rolo", "Fatia de bolo de rolo tradicional pernambucano.", 18.90],
  ["Pêssego com Creme", "Pêssego em calda com creme de confeiteiro.", 15.90],
  ["Salada de Frutas", "Salada de frutas frescas da estação.", 13.90],
  ["Beijinho", "Porção com 4 unidades de beijinho artesanal.", 16.90],
  ["Torta de Nozes", "Fatia de torta de nozes com calda de caramelo.", 25.90],
  ["Mil Folhas", "Fatia de mil folhas com creme de confeiteiro.", 24.90],
  ["Suflê de Chocolate", "Suflê quente de chocolate, servido na hora.", 31.90]
];

const dadosBebidas = [
  ["Água Mineral sem Gás", "Garrafa 500ml.", 6.00],
  ["Água Mineral com Gás", "Garrafa 500ml.", 6.50],
  ["Coca-Cola", "Lata 350ml.", 7.90],
  ["Coca-Cola Zero", "Lata 350ml.", 7.90],
  ["Guaraná Antarctica", "Lata 350ml.", 7.00],
  ["Suco de Laranja", "Copo 400ml, suco natural.", 12.90],
  ["Suco de Limão", "Copo 400ml, suco natural.", 10.90],
  ["Suco de Maracujá", "Copo 400ml, suco natural.", 11.90],
  ["Suco de Abacaxi", "Copo 400ml, suco natural.", 11.90],
  ["Suco de Manga", "Copo 400ml, suco natural.", 12.90],
  ["Suco de Uva", "Copo 400ml, suco natural.", 12.90],
  ["Limonada Suíça", "Copo 400ml, limonada batida com leite condensado.", 13.90],
  ["Chá Gelado", "Copo 400ml, sabor pêssego ou limão.", 9.90],
  ["Café Expresso", "Dose de café expresso.", 6.90],
  ["Cappuccino", "Cappuccino tradicional.", 10.90],
  ["Água Tônica", "Lata 350ml.", 7.90],
  ["Sprite", "Lata 350ml.", 7.90],
  ["Fanta Laranja", "Lata 350ml.", 7.90],
  ["Suco de Morango", "Copo 400ml, suco natural.", 12.90],
  ["Vitamina de Frutas", "Copo 400ml, vitamina de frutas da estação.", 14.90],
  ["Milk-shake de Chocolate", "Copo 400ml, milk-shake cremoso.", 18.90],
  ["Milk-shake de Morango", "Copo 400ml, milk-shake cremoso.", 18.90],
  ["Chocolate Quente", "Xícara de chocolate quente cremoso.", 11.90],
  ["Chá Quente", "Xícara de chá, sabores variados.", 8.90],
  ["Água de Coco", "Copo 400ml, água de coco natural.", 9.90],
  ["Suco Verde Detox", "Copo 400ml, suco verde natural.", 13.90],
  ["Refrigerante Guaraná Zero", "Lata 350ml.", 7.00],
  ["Ice Tea Pêssego", "Lata 350ml.", 7.90],
  ["Soda Italiana", "Copo 400ml, sabores variados.", 14.90],
  ["Café com Leite", "Xícara de café com leite.", 8.50]
];

const dadosVinhos = [
  ["Cabernet Sauvignon", "Vinho tinto encorpado, taça ou garrafa.", 149.90],
  ["Merlot", "Vinho tinto macio e frutado.", 129.90],
  ["Malbec", "Vinho tinto argentino, encorpado e aromático.", 139.90],
  ["Pinot Noir", "Vinho tinto leve e elegante.", 179.90],
  ["Chardonnay", "Vinho branco encorpado com notas amanteigadas.", 119.90],
  ["Sauvignon Blanc", "Vinho branco fresco e cítrico.", 109.90],
  ["Pinot Grigio", "Vinho branco leve e refrescante.", 99.90],
  ["Rosé", "Vinho rosé leve e frutado.", 119.90],
  ["Espumante Brut", "Espumante nacional, seco e refrescante.", 89.90],
  ["Prosecco", "Espumante italiano leve e frutado.", 159.90],
  ["Tannat", "Vinho tinto uruguaio, encorpado e tânico.", 149.90],
  ["Syrah", "Vinho tinto especiado e encorpado.", 169.90],
  ["Sangiovese", "Vinho tinto italiano de acidez marcante.", 139.90],
  ["Tempranillo", "Vinho tinto espanhol equilibrado.", 129.90],
  ["Zinfandel", "Vinho tinto encorpado e frutado.", 189.90],
  ["Moscato", "Vinho branco doce e aromático.", 99.90],
  ["Riesling", "Vinho branco aromático, seco a meio-doce.", 149.90],
  ["Viognier", "Vinho branco aromático e encorpado.", 159.90],
  ["Carménère", "Vinho tinto chileno, macio e especiado.", 139.90],
  ["Chianti", "Vinho tinto italiano clássico.", 169.90],
  ["Rioja", "Vinho tinto espanhol envelhecido em carvalho.", 219.90],
  ["Champagne Brut", "Champagne francês tradicional.", 599.90],
  ["Cava Espanhol", "Espumante espanhol método tradicional.", 179.90],
  ["Vinho do Porto", "Vinho fortificado português, taça ou garrafa.", 249.90],
  ["Verdejo", "Vinho branco espanhol fresco e mineral.", 119.90],
  ["Grenache", "Vinho tinto macio e frutado.", 149.90],
  ["Petit Verdot", "Vinho tinto encorpado e estruturado.", 199.90],
  ["Nebbiolo", "Vinho tinto italiano de guarda.", 349.90],
  ["Barbera", "Vinho tinto italiano de acidez viva.", 159.90],
  ["Vinho Branco Seco da Casa", "Vinho branco da casa, seco e leve.", 79.90]
];

function montarLista(lista, categoria, inicioId) {
  return lista.map((item, indice) => {
    const [nome, descricao, preco] = item;
    return {
      id: inicioId + indice,
      nome: nome,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
      imagem: "assets/img/produtos/" + slug(nome) + ".jpg"
    };
  });
}

const produtos = [
  ...montarLista(dadosEntradas, "Entradas", 1),
  ...montarLista(dadosPrincipais, "Prato Principal", 101),
  ...montarLista(dadosSobremesas, "Sobremesas", 201),
  ...montarLista(dadosBebidas, "Bebidas", 301),
  ...montarLista(dadosVinhos, "Carta de Vinhos", 401)
];
