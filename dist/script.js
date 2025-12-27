import { mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";
import { getUsuario } from "./getUsuario.js";
import { Logout } from "./logout.js";
import { protectRoute } from "./protectRoute.js";
import { AbrirFormularioCadastro } from "./showFormCreate.js";
protectRoute();
Logout();
getUsuario();
async function dados() {
    mostarDados();
}
dados();
postLogin();
AbrirFormularioCadastro();
//# sourceMappingURL=script.js.map