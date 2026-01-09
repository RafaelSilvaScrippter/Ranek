import { fetchDados } from "./fetch.js";
let produto;
let usuarioEmail;
export function getProdutoUnique(dados) {
    if (dados) {
        produto = dados;
    }
}
export function getUsuarioEmail(usuario) {
    if (usuario) {
        console.log(usuario);
        usuarioEmail = usuario;
    }
}
export function transacao(btn) {
    btn?.addEventListener("click", (e) => {
        e.preventDefault();
        comprarProduto();
    });
    async function comprarProduto() {
        console.log(produto);
        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/transacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")?.replace('Bearer', '')
            },
            body: JSON.stringify({
                comprador_id: usuarioEmail.email,
                endereco: {
                    cep: usuarioEmail.cep,
                    estado: usuarioEmail.estado,
                    bairro: usuarioEmail.bairro,
                    cidade: usuarioEmail.cidade,
                    numero: usuarioEmail.numero,
                    rua: usuarioEmail.rua
                },
                produto_id: produto.id,
                vendedor_id: produto.usuario_id
            })
        });
        console.log(dados);
    }
}
//# sourceMappingURL=transacao.js.map