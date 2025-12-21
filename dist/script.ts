import { fetchDados, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";

async function dados() {
  mostarDados();
}
dados();
postLogin();
AbrirFormularioCadastro();
