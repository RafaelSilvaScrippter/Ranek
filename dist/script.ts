import { fetchDados, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { protectRoute } from "./protectRoute.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";
protectRoute();

async function dados() {
  mostarDados();
}
dados();
postLogin();
AbrirFormularioCadastro();
