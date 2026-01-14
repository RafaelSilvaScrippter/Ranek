import { fetchDados } from "./fetch.js";

export function updateUser() {
  const btnEditar = document.querySelector("[data-editar]");
  const dataFormEditar = document.querySelector("[data-form-editar]");
  if (dataFormEditar instanceof HTMLFormElement)
    dataFormEditar?.addEventListener("submit", getDadosInput);
  interface dadosFormGet {
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

  const dadosForm = {} as dadosFormGet;

  function getDadosInput(e: SubmitEvent) {
    e.preventDefault();
    const inputs = dataFormEditar?.querySelectorAll("input");
    inputs?.forEach((input) => {
      if (input.value !== "") {
        dadosForm[input.name as keyof dadosFormGet] = input.value;
      }
    });
    atualizar(dadosForm);
  }
  interface respostaUpdate {
    ID: number;
  }
  const token = localStorage.getItem("token");
  async function atualizar(dados: dadosFormGet) {
    let response:respostaUpdate;
    try{
      if(btnEditar && btnEditar instanceof HTMLButtonElement){
        btnEditar.innerText = 'Carregando'
        btnEditar.disabled = true
      }
      response = await fetchDados(
        "https://ranekapi.origamid.dev/json/api/usuario",
        {
          method: "PUT",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      }
    );
    if(response && response.ID) {
      window.location.href = "../../pages/conta/produtos.html";
    }
  }catch(err){
      if(btnEditar && btnEditar instanceof HTMLButtonElement){
        btnEditar.innerText = 'Atualizar Usuário'
        btnEditar.disabled = false
      }
    console.log(err)
  }finally{
      if(btnEditar && btnEditar instanceof HTMLButtonElement){
        btnEditar.innerText = 'Atualizar Usuário'
        btnEditar.disabled = false
      }

    }
  }
}
