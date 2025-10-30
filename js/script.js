// Pega a lista de produtos do localStorage (ou cria uma vazia)
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para mostrar os produtos na tabela
function mostrarProdutos() {
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';

  // Filtra produtos conforme a busca (sem diferenciar maiúsculas e minúsculas)
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  produtosFiltrados.forEach((p, index) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${p.nomeTexto} ${p.nomeNumero ? p.nomeNumero : ''}</td>
      <td>${p.quantidade}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td><button class="excluir" data-index="${index}">Excluir</button></td>
    `;
    lista.appendChild(linha);
  });
}

 // Adiciona evento aos botões de excluir
 document.querySelectorAll('.excluir').forEach(botao => {
  botao.addEventListener('click', (e) => {
    const indice = e.target.getAttribute('data-index');
    excluirProduto(indice);
  });
});

// Função para excluir um produto
function excluirProduto(indice) {
if (confirm('Tem certeza que deseja excluir este produto?')) {
  produtos.splice(indice, 1); // Remove 1 item na posição "indice"
  localStorage.setItem('produtos', JSON.stringify(produtos));
  mostrarProdutos();
}
}

// Quando clicar no botão “Adicionar”
document.getElementById('adicionar').addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;

  // Validação simples
  if (nome === '' || quantidade === '' || preco === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Separa texto e número do nome (ex: "Produto 10" -> "Produto" e 10)
  const partes = nome.split(' ');
  let nomeTexto = '';
  let nomeNumero = null;

  partes.forEach((parte) => {
    if (!isNaN(parte)) {
      nomeNumero = parseInt(parte); // guarda o número
    } else {
      nomeTexto += (nomeTexto ? ' ' : '') + parte; // junta o texto
    }
  });

  // Cria o produto
  const novoProduto = {
    nomeTexto,
    nomeNumero,
    quantidade: Number(quantidade),
    preco: Number(preco)
  };

  // Adiciona na lista
  produtos.push(novoProduto);

  // Salva no localStorage
  localStorage.setItem('produtos', JSON.stringify(produtos));

  // Mostra na tabela
  mostrarProdutos();

  // Limpa os campos
  document.getElementById('nome').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('preco').value = '';
});

// Campo de busca
document.getElementById('busca').addEventListener('input', (e) => {
  mostrarProdutos(e.target.value);
});


// Mostra os produtos salvos ao carregar a página
mostrarProdutos();
