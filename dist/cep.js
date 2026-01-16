import { fetchDados } from "./fetch.js";
export function fetchCep() {
    const dadosCepInput = document.querySelectorAll('[data-dados-cep]');
    const dataInputChange = document.querySelector('[data-change-input]');
    if (dataInputChange && dataInputChange instanceof HTMLInputElement) {
        dataInputChange?.addEventListener('change', fazerFetchCep);
        async function fazerFetchCep() {
            const dados = await fetchDados(`https://viacep.com.br/ws/${dataInputChange.value}/json`);
            dadosCepInput.forEach((item) => {
                if (item instanceof HTMLInputElement) {
                    if (item.dataset.dadosCep) {
                        console.log(dados);
                        item.value = dados[item.dataset.dadosCep];
                    }
                }
            });
        }
    }
}
//# sourceMappingURL=cep.js.map