import { fetchDados } from "./fetch.js"

export async function getTransacao(){

    interface endereco{
        bairro:string;
        cep:string;
        cidade:string;
        estado:string;
        numero:string;
        rua:string;
    }

    interface fotos {
        titulo:string;
        src:string
    }

    interface produto{
        descricao:string;
        fotos:fotos[]
        id:string;
        nome:string;
        preco:string;
        usuario_id:string;
        vendido:string;
        vendedor_id:string;
    }

    interface compras {
        comprador_id:string;
        data:string;
        endereco:endereco;
        produto:produto;
        vendedor_id:string;
    }
    const dataElementoLoading = document.querySelector('[data-elemento-loading]')

    const dataCompras = document.querySelector('[data-compras]')
    
    try{
         if(dataElementoLoading && dataElementoLoading instanceof HTMLDivElement){

            dataElementoLoading.style.display = 'flex'
        }
        const dados:compras[] = await fetchDados('https://ranekapi.origamid.dev/json/api/transacao?tipo=comprador_id',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token')?.replace('Bearer','')
            }
        })
        if(dataCompras && dataCompras instanceof HTMLElement){
            dados.forEach((produto) =>{
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
                `
            })
        }
    }catch(err){
        if(dataElementoLoading && dataElementoLoading instanceof HTMLDivElement){

            dataElementoLoading.style.display = 'none'
        }
    }finally{
 if(dataElementoLoading && dataElementoLoading instanceof HTMLDivElement){

            dataElementoLoading.style.display = 'none'
        }
    }
    
}