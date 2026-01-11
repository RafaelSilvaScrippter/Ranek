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
        console.log(formData)
        const dados = await fetchDados('https://ranekapi.origamid.dev/json/api/produto',{
            method:'POST',
            headers:{
                Authorization:"Bearer " + window.localStorage.getItem('token')?.replace('Bearer','')
            },
            body:formData
        })
        console.log(dados)
    }

}


// https://ranekapi.origamid.dev/json/api/produto