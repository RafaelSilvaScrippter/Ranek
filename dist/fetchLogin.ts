import { fetchDados } from "./fetch.js";

export function postLogin() {
  const erroMessage = document.querySelector("[data-erro-message]");
  const dataEnviar = document.querySelector("[data-enviar]");
  const dataLoginForm = document.querySelector("[data-login]");

  dataLoginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e instanceof SubmitEvent) getTargetInput(e);
  });

  interface CorpoLogin {
    [key: string]: string;
  }

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
    postDados(objectDados);
  }

  interface Data {
    status: number;
  }
  interface ResponseLogin {
    code: string;
    data: Data;
    message: string;
  }

  async function postDados(objectDados: CorpoLogin) {
    const response: ResponseLogin = await fetchDados(
      "https://ranekapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectDados),
      }
    );
    const limpar = response.message.replace("<strong></strong>", "");
    if (erroMessage) {
      erroMessage.innerHTML = limpar;
    }
  }
}
