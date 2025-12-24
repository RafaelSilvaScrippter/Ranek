import { fetchDados } from "./fetch.js";

export function postLogin() {
  const erroMessage = document.querySelector("[data-erro-message]");
  const erroMessageCriar = document.querySelector("[data-erro-message-criar]");
  const dataEnviar = document.querySelector("[data-enviar]");
  const dataLoginForm = document.querySelector("[data-login]");

  const dataFormularioCriar = document.querySelector("[data-formulario]");
  const dataBtnCriar = document.querySelector("[data-btn-criar]");

  dataLoginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e instanceof SubmitEvent) getTargetInput(e);
  });

  dataFormularioCriar?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e instanceof SubmitEvent) {
      getTargetInput(e);
    }
  });

  interface CorpoLogin {
    [key: string]: string;
  }

  interface ResponseId {
    ID: number;
  }

  type tiposRole = "criar" | "login" | undefined;

  function getTargetInput(e: SubmitEvent) {
    let objectDados: CorpoLogin = {};
    const formInputs = e.target;
    if (formInputs instanceof HTMLFormElement) {
      const inputsSelect = formInputs.querySelectorAll("input");
      inputsSelect.forEach((input) => {
        if (typeof input.name === "string") {
          objectDados[input.name] = input.value;
        }
      });
    }
    if (e.submitter?.dataset) {
      const typeRole = e.submitter.dataset.role;
      if (typeRole) {
        corresponedRole(typeRole, objectDados);
      }
    }
  }

  function corresponedRole(dados: tiposRole | string, objdatos: CorpoLogin) {
    if (dados && typeof dados === "string") {
      const tipo: tiposRole | string = dados;
      if (tipo === "login") {
        postDados(objdatos);
      } else {
        postCreate(objdatos);
      }
    }
  }

  interface Data {
    status: number;
  }
  interface ResponseLogin extends ResponseId {
    code: string;
    data: Data;
    message: string;
    token: string;
  }

  async function postDados(objectDados: CorpoLogin) {
    const response: ResponseLogin = await fetchDados(
      "https://ranekapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: objectDados.email,
          password: objectDados.senha,
        }),
      }
    );
    if (response.message) {
      const limpar = response.message.replace("<strong></strong>", "");
      if (erroMessage) {
        erroMessage.innerHTML = limpar;
      }
    }
    if (response.token) {
      location.href = "./conta/produtos.html";
    }
    localStorage.setItem("token", response.token);
  }

  async function postCreate(objdatos: CorpoLogin) {
    const response: ResponseLogin = await fetchDados(
      "https://ranekapi.origamid.dev/json/api/usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objdatos),
      }
    );

    if (erroMessageCriar && response.message) {
      const limpar = response.message.replace("<strong></strong>", "");
      erroMessageCriar.innerHTML = limpar;
    }
    if (response.ID) {
      postDados(objdatos);
    }
  }
}
