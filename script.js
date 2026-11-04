const WHATSAPP = "5500000000000";
// Troque pelo número comercial da loja: 55 + DDD + telefone.

const produtos = [
    {
        id: 1,
        nome: "Biquíni Serena",
        categoria: "biquinis",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=700"
    },
    {
        id: 2,
        nome: "Biquíni Maré",
        categoria: "biquinis",
        preco: 169.90,
        imagem: "https://images.unsplash.com/photo-1582639590018-8c9c9b6f2f2f?w=700"
    },
    {
        id: 3,
        nome: "Maiô Horizonte",
        categoria: "maios",
        preco: 219.90,
        imagem: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700"
    },
    {
        id: 4,
        nome: "Saída Brisa",
        categoria: "saidas",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700"
    }
];

let carrinho = [];

const produtosContainer = document.getElementById("products");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos(lista) {
    produtosContainer.innerHTML = "";

    lista.forEach(produto => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${formatarPreco(produto.preco)}</p>
            <button onclick="adicionarCarrinho(${produto.id})">
                Adicionar à sacola
            </button>
        `;

        produtosContainer.appendChild(card);
    });
}

function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

function atualizarCarrinho() {
    const container = document.getElementById("cartItems");

    container.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade;

        const item = document.createElement("div");
        item.className = "cart-product";

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <p>${formatarPreco(produto.preco)}</p>
                <p>Quantidade: ${produto.quantidade}</p>
                <button onclick="removerProduto(${produto.id})">
                    Remover
                </button>
            </div>
        `;

        container.appendChild(item);
    });

    document.getElementById("subtotal").textContent =
        formatarPreco(total);

    document.getElementById("cartCount").textContent =
        quantidadeTotal;
}

function removerProduto(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("cart").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}

function fecharCarrinho() {
    document.getElementById("cart").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}

document.getElementById("cartToggle")
    .addEventListener("click", abrirCarrinho);

document.getElementById("closeCart")
    .addEventListener("click", fecharCarrinho);

document.getElementById("overlay")
    .addEventListener("click", fecharCarrinho);

document.getElementById("menuToggle")
    .addEventListener("click", () => {
        document.getElementById("menu").classList.toggle("open");
    });

document.querySelectorAll("[data-filter]").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]")
            .forEach(b => b.classList.remove("active"));

        botao.classList.add("active");

        const filtro = botao.dataset.filter;

        const filtrados = filtro === "todos"
            ? produtos
            : produtos.filter(p => p.categoria === filtro);

        mostrarProdutos(filtrados);
    });
});

document.getElementById("checkout")
    .addEventListener("click", () => {

        if (carrinho.length === 0) {
            alert("Sua sacola está vazia!");
            return;
        }

        if (WHATSAPP === "5500000000000") {
            alert("Configure o WhatsApp comercial no arquivo script.js.");
            return;
        }

        let mensagem = "Olá! Quero fazer um pedido na My Beachwear Reserva:\n\n";

        carrinho.forEach(produto => {
            mensagem += `${produto.nome} - Quantidade: ${produto.quantidade} - ${formatarPreco(produto.preco * produto.quantidade)}\n`;
        });

        const total = carrinho.reduce(
            (soma, p) => soma + p.preco * p.quantidade, 0
        );

        mensagem += `\nSubtotal: ${formatarPreco(total)}`;
        mensagem += "\nGostaria de confirmar o frete e as formas de pagamento.";

        const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

        window.open(link, "_blank");
    });

document.getElementById("newsletterForm")
    .addEventListener("submit", event => {
        event.preventDefault();

        document.getElementById("newsletterMessage")
            .textContent = "Obrigada pelo cadastro!";

        event.target.reset();
    });

mostrarProdutos(produtos);
atualizarCarrinho();