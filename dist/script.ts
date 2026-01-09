import { fetchDados, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { getUsuario } from "./getUsuario.js";
import { Logout } from "./logout.js";
import { protectRoute } from "./protectRoute.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";
import { transacao } from "./transacao.js";
import { updateUser } from "./updateDados.js";
protectRoute();
Logout();
getUsuario();
updateUser();

async function dados() {
  mostarDados();
}
dados();
postLogin();
AbrirFormularioCadastro();
