import { fetchDados } from "./fetch.js";

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
  interface DadosGetLogin {
    bairro: string;
    cep: string;
    cidade: string;
    email: string;
    estado: string;
    id: string;
    nome: string;
    rua: string;
    numero: string;
  }
let produto:InterfaceProdutos;
let usuarioEmail:DadosGetLogin;

export function getProdutoUnique(dados:InterfaceProdutos){
    if(dados){
        produto = dados
    }

}

export function getUsuarioEmail(usuario:DadosGetLogin){
    if(usuario){
        console.log(usuario)

        usuarioEmail = usuario
    }
}

export function transacao(btn:HTMLButtonElement){
    btn?.addEventListener("click",(e) =>{
        e.preventDefault()
        comprarProduto()
    })
    
    async function comprarProduto(){
    console.log(produto)        
        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/transacao',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:'Bearer ' + localStorage.getItem("token")?.replace('Bearer','')
            },
            body:JSON.stringify({
                comprador_id:usuarioEmail.email,
                endereco:{
                    cep:usuarioEmail.cep,
                    estado:usuarioEmail.estado,
                    bairro:usuarioEmail.bairro,
                    cidade:usuarioEmail.cidade,
                    numero:usuarioEmail.numero,
                    rua:usuarioEmail.rua
                },
                produto_id:produto.id,
                vendedor_id:produto.usuario_id
            })
        })

    }

}