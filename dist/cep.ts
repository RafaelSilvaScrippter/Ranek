import { fetchDados } from "./fetch.js";

export function fetchCep(){
    const dadosCepInput = document.querySelectorAll('[data-dados-cep]')
    const dataInputChange = document.querySelector('[data-change-input]') as HTMLInputElement
    if(dataInputChange && dataInputChange instanceof HTMLInputElement){
        dataInputChange?.addEventListener('change',fazerFetchCep)
        async function fazerFetchCep(){
            const dados:Record<string,string> = await fetchDados(`https://viacep.com.br/ws/${dataInputChange.value}/json`)
           dadosCepInput.forEach((item) =>{
            if(item instanceof HTMLInputElement){
                if(item.dataset.dadosCep){

                   item.value = dados[item.dataset.dadosCep]
                }
            }
           })
            
        
    }      
    }
}