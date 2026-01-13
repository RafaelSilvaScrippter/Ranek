import { fetchDados } from "./fetch.js";
export async function getTransacao() {
    const dataElementoLoading = document.querySelector('[data-elemento-loading]');
    const dataCompras = document.querySelector('[data-compras]');
    try {
        if (dataElementoLoading && dataElementoLoading instanceof HTMLDivElement) {
            dataElementoLoading.style.display = 'flex';
        }
        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/transacao?tipo=comprador_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token')?.replace('Bearer', '')
            }
        });
        if (dataCompras && dataCompras instanceof HTMLElement) {
            dados.forEach((produto) => {
                dataCompras.innerHTML += `
            <div class='produto-compra-item'>
                <div class="foto-compra">
                    <img  src="${produto.produto.fotos[0].src}" title='${produto.produto.fotos[0].titulo}' />
                </div>
                <div class="dados-compra">
                    <p class='preco-produto-compra'>R$ ${produto.produto.preco}</p>
                    <h2>${produto.produto.nome}</h2>
                    <p> <span class="vendedor-span">Vendedor: </span>${produto.vendedor_id}</p>
                </div>
                </div>
                `;
            });
        }
    }
    catch (err) {
        if (dataElementoLoading && dataElementoLoading instanceof HTMLDivElement) {
            dataElementoLoading.style.display = 'none';
        }
    }
    finally {
        if (dataElementoLoading && dataElementoLoading instanceof HTMLDivElement) {
            dataElementoLoading.style.display = 'none';
        }
    }
}
//# sourceMappingURL=getCompras.js.map