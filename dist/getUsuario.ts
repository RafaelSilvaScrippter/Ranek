import { fetchDados } from "./fetch.js";

export function getUsuario() {
  const dataFormEditar = document.querySelector("[data-form-editar]");

  interface validate {
    code: string;
    data: {};
  }
  const token = localStorage.getItem("token");
  if (!token) return;
  console.log(token);
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
    const response: DadosGetLogin[] = await fetchDados(
      "https://ranekapi.origamid.dev/json/api/usuario",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    showDados(response);
  }

  function showDados(dadosObj: DadosGetLogin[]) {
    if (dataFormEditar) {
      const inputs = dataFormEditar.querySelectorAll("input");
      inputs.forEach((input) => {
        const key = input.id as keyof DadosGetLogin[];
        if (key in dadosObj) {
          input.value = String(dadosObj[key]) ?? "";
        }
      });
    }
  }

  requestGet();
}
