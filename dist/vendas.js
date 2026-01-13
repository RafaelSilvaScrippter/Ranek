import { fetchDados } from "./fetch.js";
export async function vendas() {
    const dataVendasContainer = document.querySelector('[data-vendas-container]');
    const dataElementoLoading = document.querySelector('[data-elemento-loading]');
    try {
        if (dataElementoLoading && dataElementoLoading instanceof HTMLDivElement) {
            dataElementoLoading.style.display = 'flex';
        }
        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/transacao?tipo=vendedor_id', {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                Authorization: 'Bearer ' + window.localStorage.getItem("token")?.replace('Bearer', '')
            }
        });
        dados.forEach((produto) => {
            if (dataVendasContainer instanceof HTMLDivElement)
                dataVendasContainer.innerHTML += `
        
        <div class='produto-compra-item'>
            <div class="foto-compra">
                <img src='${produto.produto.fotos[0] ? produto.produto.fotos[0].src : ''}' title='${produto.produto.fotos[0] ? produto.produto.fotos[0].titulo : ''}'>
            </div>
            <div class="dados-compra">
                <p>R$ ${produto.produto.preco}</p>
                <h2>${produto.produto.nome}</h2>
                <p><span class="vendedor-span">Comprador</span> ${produto.produto.usuario_id}</p>
                </div>
                <div class='div-entrega'>
                <h2>Entrega</h2>
                </div>
                <div class='endereco-entrega'>
                <ul>
                <li>cep: ${produto.endereco.cep}</li>
                <li>rua: ${produto.endereco.rua}</li>
                <li>número: ${produto.endereco.numero}</li>
                <li>bairro: ${produto.endereco.bairro}</li>
                <li>cidade: ${produto.endereco.cidade}</li>
                <li>estado: ${produto.endereco.estado}</li>
                </ul>
                </div>
                </div>
                
                
                `;
        });
    }
    catch (err) {
        console.log(err);
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
//# sourceMappingURL=vendas.js.map