import { fetchDados } from "./fetch.js";
export function postLogin() {
    const erroMessage = document.querySelector("[data-erro-message]");
    const erroMessageCriar = document.querySelector("[data-erro-message-criar]");
    const dataEnviar = document.querySelector("[data-enviar]");
    const dataLoginForm = document.querySelector("[data-login]");
    const dataFormularioCriar = document.querySelector("[data-formulario]");
    const dataBtnCriar = document.querySelector("[data-btn-criar]");
    dataLoginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e instanceof SubmitEvent)
            getTargetInput(e);
    });
    dataFormularioCriar?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e instanceof SubmitEvent) {
            getTargetInput(e);
        }
    });
    function getTargetInput(e) {
        let objectDados = {};
        const formInputs = e.target;
        if (formInputs instanceof HTMLFormElement) {
            const inputsSelect = formInputs.querySelectorAll("input");
            inputsSelect.forEach((input) => {
                if (typeof input.name === "string") {
                    objectDados[input.name] = input.value;
                }
            });
        }
        if (e.submitter?.dataset) {
            const typeRole = e.submitter.dataset.role;
            if (typeRole) {
                corresponedRole(typeRole, objectDados);
            }
            console.log(typeRole);
        }
    }
    function corresponedRole(dados, objdatos) {
        if (dados && typeof dados === "string") {
            const tipo = dados;
            if (tipo === "login") {
                postDados(objdatos);
            }
            else {
                postCreate(objdatos);
            }
        }
    }
    async function postDados(objectDados) {
        const response = await fetchDados("https://ranekapi.origamid.dev/json/jwt-auth/v1/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectDados),
        });
        const limpar = response.message.replace("<strong></strong>", "");
        if (erroMessage) {
            erroMessage.innerHTML = limpar;
        }
    }
    async function postCreate(objdatos) {
        const response = await fetchDados("https://ranekapi.origamid.dev/json/api/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objdatos),
        });
        if (erroMessageCriar && response.message) {
            const limpar = response.message.replace("<strong></strong>", "");
            erroMessageCriar.innerHTML = limpar;
        }
        console.log(response);
    }
}
//# sourceMappingURL=fetchLogin.js.map