export function postLogin() {
  const dataEnviar = document.querySelector("[data-enviar]");
  const dataLoginForm = document.querySelector("[data-login]");

  dataLoginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
  });
}
