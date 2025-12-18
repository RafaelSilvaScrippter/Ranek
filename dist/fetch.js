const dataMain = document.querySelector("[data-main-produtos]");
const dataMainProduto = document.querySelector("[data-produto-unico]");
export async function fetchDados(url) {
    const response = await fetch(url);
    const dados = await response.json();
    return dados;
}
export async function mostarDados() {
    if (dataMain instanceof HTMLElement) {
        const dados = await fetchDados("https://ranekapi.origamid.dev/json/api/produto?_limit=9");
        if (dados) {
            console.log(dados);
            dados.map((dado) => {
                dataMain.innerHTML += `
        <div class='card-item-produto'>
        <a href=./pages/produto?produto=${dado.id}.html>
            <img src="${dado.fotos[0].src}" title="${dado.fotos[0].titulo}" />
            <div class="header-card">
              <p class="preco-card">R$ ${dado.preco}</p>  
              <h2 class="nome-card">${dado.nome}</h2>
            </div>
            <p class="descricao-card">${dado.descricao}</p>
          </a>
        </div>
        `;
            });
        }
    }
}
const getParams = new URLSearchParams(window.location.search)
    .get("produto")
    ?.replace(".html", "");
console.log(getParams);
export async function getProduto() {
    const dados = await fetchDados(`https://ranekapi.origamid.dev/json/api/produto/${getParams}`);
    if (dados && dataMainProduto) {
        dataMainProduto.innerHTML = `
    <div class="div-produto-container">
      <div>
      <img src='${dados.fotos[0].src}' title='${dados.fotos[0].titulo}'/>
      <img src='${dados.fotos[1]?.src}' title='${dados.fotos[1]?.titulo}'/>
      </div>
      <div class="conteudo-produto">
        <div class="header-card">
          <p class="preco-card">R$ ${dados.preco}</p>  
          <h2 class="nome-card">${dados.nome}</h2>
        </div>
        <p class="descricao-card">${dados.descricao}</p>
      </div>
    </div>
    `;
    }
}
getProduto();
//# sourceMappingURL=fetch.js.map