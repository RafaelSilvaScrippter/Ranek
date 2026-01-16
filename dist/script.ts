import { fetchCep } from "./cep.js";
import { getProduto, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { getTransacao } from "./getCompras.js";
import { getUsuario } from "./getUsuario.js";
import { Logout } from "./logout.js";
import { postProduto } from "./postProduto.js";
import { protectRoute } from "./protectRoute.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";
import { updateUser } from "./updateDados.js";
import { vendas } from "./vendas.js";
protectRoute();
Logout();
fetchCep()
getUsuario();
updateUser();
postProduto()
if(window.localStorage.getItem('token')){
  vendas()
  getTransacao()
}
  
async function dados() {
  if(window.location.href.includes('/pages/produto?produto')){
    console.log('contem')
    getProduto()
  }
}
mostarDados();
dados();
postLogin();
AbrirFormularioCadastro();