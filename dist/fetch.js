const dataMain = document.querySelector("[data-main-produtos]");
export async function fetchDados(url) {
    const response = await fetch(url);
    const dados = await response.json();
    return dados;
}
export async function mostarDados() {
    if (dataMain instanceof HTMLElement) {
        const dados = await fetchDados("https://ranekapi.origamid.dev/json/api/produto?_limit=9");
        if (dados) {
            dados.map((dado) => {
                dataMain.innerHTML += `
        <div class='card-item-produto'>
          <img src="${dado.fotos[0].src}" title="${dado.fotos[0].titulo}" />
          <div class="header-card">
            <p class="preco-card">R$ ${dado.preco}</p>  
            <h2 class="nome-card">${dado.nome}</h2>
          </div>
            <p class="descricao-card">${dado.descricao}</p>
        </div>
        `;
            });
        }
    }
}
//# sourceMappingURL=fetch.js.map