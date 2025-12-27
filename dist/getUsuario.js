import { fetchDados } from "./fetch.js";
export function getUsuario() {
    const dataFormEditar = document.querySelector("[data-form-editar]");
    const token = localStorage.getItem("token");
    if (!token)
        return;
    console.log(token);
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
        const response = await fetchDados("https://ranekapi.origamid.dev/json/api/usuario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
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