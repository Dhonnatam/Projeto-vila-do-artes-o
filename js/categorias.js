document.addEventListener('DOMContentLoaded', function() {
    fetch('categorias.json')
        .then(response => response.json())
        .then(categoria => {
            const categorias = document.getElementById('categorias');

            categoria.forEach(categoria => {
                const categoriasHTML = `
                    <div class="categoria">
                        <img src="${categoria.imagem}" alt="${categoria.categoria}">
                        <h3>${categoria.categoria}</h3>
                        <p>${categoria.descricao}</p>
                        <button>Acessar Categoria</button>
                    </div>
                `;
                categorias.innerHTML += categoriasHTML;
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
});

