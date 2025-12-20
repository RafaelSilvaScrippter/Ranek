import { fetchDados, mostarDados } from "./fetch.js";
import { postLogin } from "./fetchLogin.js";

async function dados() {
  mostarDados();
}
dados();
postLogin();
