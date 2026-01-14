import { fetchDados } from "./fetch.js";

export function postProduto(){
    let formData = new FormData()
    let objectKeys:{[key:string]:any} = {}; 
    const dataFormularioPost = document.querySelector('[data-formulario-post]')
    const btnPostarProduto = document.querySelector('[data-postar-produto]')
    const inputsForm = dataFormularioPost?.querySelectorAll('[data-input-post]')
    const inputFile = dataFormularioPost?.querySelector('[data-input-file]')
    btnPostarProduto?.addEventListener('click',(e) =>{
        e.preventDefault()
        getDados()
    })

    function getDados(){
        if(inputsForm){
            const arrayInputs = Array.from(inputsForm)
            if(arrayInputs instanceof Array){
                arrayInputs.forEach((input) =>{
                    if(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)
                   formData.append(input.name,input.value)
                if(inputFile && inputFile instanceof HTMLInputElement){
                    if(inputFile.files){
                        formData.append(inputFile.name,inputFile.files[0])
                    }
                }
            })

            }
            postar()
        }

    }

  async  function postar(){
        
    try{
        if(btnPostarProduto  && btnPostarProduto instanceof HTMLButtonElement){
            btnPostarProduto.disabled = true;
            btnPostarProduto.innerText = 'Carregando'
        }

        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/produto',{
            method:'POST',
            headers:{
                Authorization:"Bearer " + window.localStorage.getItem('token')?.replace('Bearer','')
            },
            body:formData
        })
        
    }catch(err){
        if(btnPostarProduto  && btnPostarProduto instanceof HTMLButtonElement){
            btnPostarProduto.disabled = false;
            btnPostarProduto.innerText = 'Adicionar Produto'
        }
        console.log(err)
    }finally{
        if(btnPostarProduto  && btnPostarProduto instanceof HTMLButtonElement){
            btnPostarProduto.disabled = false;
            btnPostarProduto.innerText = 'Adicionar Produto'
        }
    }
}

}


// https://ranekapi.origamid.dev/json/api/produto