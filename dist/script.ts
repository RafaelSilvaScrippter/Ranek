import { fetchDados, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { getTransacao } from "./getCompras.js";
import { getUsuario } from "./getUsuario.js";
import { Logout } from "./logout.js";
import { postProduto } from "./postProduto.js";
import { protectRoute } from "./protectRoute.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";
import { updateUser } from "./updateDados.js";
protectRoute();
Logout();
getUsuario();
updateUser();
postProduto()

async function dados() {
  mostarDados();
}
dados();
postLogin();
AbrirFormularioCadastro();
getTransacao()