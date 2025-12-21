export function AbrirFormularioCadastro() {
    const dataBtnAbrir = document.querySelector("[data-btn-abrir]");
    const dataFormulario = document.querySelector("[data-formulario]");
    dataBtnAbrir?.addEventListener("click", mostrarForm);
    function mostrarForm() {
        if (this) {
            this.classList.add("none");
        }
        if (dataFormulario instanceof HTMLFormElement)
            dataFormulario?.classList.add("block");
    }
}
//# sourceMappingURL=showFormCreate.js.map