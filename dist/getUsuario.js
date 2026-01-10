import { fetchDados } from "./fetch.js";
import { getUsuarioEmail } from "./transacao.js";
export function getUsuario() {
    const dataFormEditar = document.querySelector("[data-form-editar]");
    const linkUsuario = document.querySelector('[data-login-link]');
    const token = localStorage.getItem("token");
    if (!token)
        return;
    async function validateLogin() {
        const response = await fetchDados("https://ranekapi.origamid.dev/json/jwt-auth/v1/token/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
    }
    validateLogin();
    async function requestGet() {
        let response = await fetchDados("https://ranekapi.origamid.dev/json/api/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        let dadosUsuario = await fetchDados("https://ranekapi.origamid.dev/json/api/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (token && linkUsuario && linkUsuario instanceof HTMLAnchorElement) {
            linkUsuario.innerText = dadosUsuario.nome;
        }
        getUsuarioEmail(dadosUsuario);
        showDados(response);
    }
    function showDados(dadosObj) {
        if (dataFormEditar) {
            const inputs = dataFormEditar.querySelectorAll("input");
            inputs.forEach((input) => {
                const key = input.id;
                if (key in dadosObj) {
                    input.value = String(dadosObj[key]) ?? "";
                }
            });
        }
    }
    requestGet();
}
//# sourceMappingURL=getUsuario.js.map