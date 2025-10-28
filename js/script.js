// Pega a lista de produtos do localStorage (ou cria uma vazia)
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para mostrar os produtos na tabela
function mostrarProdutos() {
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';

  produtos.forEach((p) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${p.nome}</td>
      <td>${Number(p.quantidade)}</td>
      <td>R$ ${Number(p.preco).toFixed(2)}</td>
    `;
    lista.appendChild(linha);
  });
}

// Quando clicar no botão “Adicionar”
document.getElementById('adicionar').addEventListener('click', () => {
  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;

  // Validação simples
  if (nome === '' || quantidade === '' || preco === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Cria o produto
  const novoProduto = {
    nome,
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

// Mostra os produtos salvos ao carregar a página
mostrarProdutos();
