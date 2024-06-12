document.addEventListener('DOMContentLoaded', function() {
    fetch('produtos.json') // Caminho para o arquivo JSON
        .then(response => response.json())
        .then(produtos => {
            const catalogo = document.getElementById('catalogo');

            if (Array.isArray(produtos)) {
                produtos.forEach(produto => {
                    const produtoHTML = `
                        <div class="product">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                            <h3>${produto.nome}</h3>
                            <p>${produto.descricao}</p>
                            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                            <button class="adicionar-carrinho">Adicionar ao Carrinho</button>
                        </div>
                    `;
                    catalogo.innerHTML += produtoHTML;
                });
            } else {
                const produtoHTML = `
                    <div class="product">
                        <img src="${produtos.imagem}" alt="${produtos.nome}">
                        <h3>${produtos.nome}</h3>
                        <p>${produtos.descricao}</p>
                        <p>Preço: R$ ${produtos.preco.toFixed(2)}</p>
                        <button class="adicionar-carrinho">Adicionar ao Carrinho</button>
                    </div>
                `;
                catalogo.innerHTML += produtoHTML;
            }
        
            // Adicionar evento de clique aos botões de adicionar ao carrinho
            document.querySelectorAll('.adicionar-carrinho').forEach(button => {
                button.addEventListener('click', function(event) {
                    const productDiv = event.target.closest('.product');
                    const nome = productDiv.querySelector('h3').textContent;
                    const descricao = productDiv.querySelector('p').textContent;
                    const imagem = productDiv.querySelector('img').src;
                    const preco = parseFloat(productDiv.querySelectorAll('p')[1].textContent.replace('Preço: R$ ', '').replace(',', '.'));

                    const produto = {
                        nome: nome,
                        descricao: descricao,
                        imagem: imagem,
                        preco: preco
                    };

                    adicionarAoCarrinho(produto);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

    carregarCarrinho();

    // Adiciona evento de clique ao botão de limpar carrinho
    document.getElementById('clear-cart').addEventListener('click', limparCarrinho);

    // Adiciona evento de clique ao botão de finalizar compra
    document.getElementById('checkout').addEventListener('click', finalizarCompra);
});

function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Limpa o conteúdo anterior

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p>O carrinho está vazio.</p>';
        cartTotal.textContent = '0,00';
    } else {
        let total = 0;

        carrinho.forEach((produto, index) => {
            const produtoHTML = `
                <div class="carrinho-item" data-index="${index}">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div>
                        <h3>${produto.nome}</h3>
                        <p>${produto.descricao}</p>
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                    <button class="remover-item">Remover</button>
                </div>
            `;
            cartItems.innerHTML += produtoHTML;
            total += produto.preco;
        });

        cartTotal.textContent = total.toFixed(2).replace('.', ',');

        // Adicionar evento de clique aos botões de remover item
        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', function(event) {
                const itemIndex = event.target.closest('.carrinho-item').dataset.index;
                removerItemDoCarrinho(itemIndex);
            });
        });
    }
}

function removerItemDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

function finalizarCompra() {
    alert('Compra finalizada!');
    limparCarrinho();
}
