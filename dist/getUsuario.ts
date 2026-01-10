import { fetchDados } from "./fetch.js";

import { getUsuarioEmail } from "./transacao.js";

export function getUsuario() {
  const dataFormEditar = document.querySelector("[data-form-editar]");
  const linkUsuario = document.querySelector('[data-login-link]')

  interface validate {
    code: string;
    data: {};
  }
  const token = localStorage.getItem("token");
  if (!token) return;
  async function validateLogin() {
    const response: validate = await fetchDados(
      "https://ranekapi.origamid.dev/json/jwt-auth/v1/token/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  }
  validateLogin();

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
  async function requestGet() {
    let response: DadosGetLogin[] = await fetchDados(
      "https://ranekapi.origamid.dev/json/api/usuario",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  

      let dadosUsuario: DadosGetLogin = await fetchDados(
      "https://ranekapi.origamid.dev/json/api/usuario",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(token && linkUsuario && linkUsuario instanceof HTMLAnchorElement){
      linkUsuario.innerText = dadosUsuario.nome
    }

    getUsuarioEmail(dadosUsuario)
    showDados(response);
  }

  function preencherDados(formulario:HTMLElement,dadosObj:DadosGetLogin[]){
    const inputs = formulario.querySelectorAll("input");
    console.log(inputs)
      inputs.forEach((input) => {
        const key = input.id as keyof DadosGetLogin[];
        if (key in dadosObj) {
          input.value = String(dadosObj[key]) ?? "";
        }
      });
  }

  function showDados(dadosObj: DadosGetLogin[]) {
    
    

    if (dataFormEditar instanceof HTMLElement) {
      preencherDados(dataFormEditar,dadosObj)
    }else{
      const elementoComprar = document.querySelector('[data-formulario-comprar]')
      if(elementoComprar instanceof HTMLElement){
        preencherDados(elementoComprar,dadosObj)
      }
    }
  }

  requestGet();
}
