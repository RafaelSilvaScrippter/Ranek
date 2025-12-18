interface InterfaceArray {
  src: string;
  titulo: string;
}

interface InterfaceProdutos {
  descricao: string;
  id: string;
  nome: string;
  preco: string;
  usuario_id: string;
  vendido: string;
  fotos: Array<InterfaceArray>;
}
const dataMain = document.querySelector("[data-main-produtos]");

export async function fetchDados<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const dados: T = await response.json();
  return dados;
}

export async function mostarDados() {
  if (dataMain instanceof HTMLElement) {
    const dados = await fetchDados<InterfaceProdutos[]>(
      "https://ranekapi.origamid.dev/json/api/produto?_limit=9"
    );
    if (dados) {
      dados.map((dado) => {
        dataMain.innerHTML += /*html */ `
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
