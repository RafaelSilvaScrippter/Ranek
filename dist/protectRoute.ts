export function protectRoute() {
  const tokenExists = localStorage.getItem("token");
  const linksHeaderLogin = document.querySelector("[data-login-link]");
  const path = window.location.pathname;
  if (tokenExists && path === "/pages/login.html") {
    window.location.href = "../../index.html";
  }

  if (tokenExists && linksHeaderLogin instanceof HTMLAnchorElement) {
    linksHeaderLogin.href = "../pages/conta/produtos.html";
  }
  if (!tokenExists && linksHeaderLogin instanceof HTMLAnchorElement) {
    linksHeaderLogin.href = "../pages/login.html";
  }
}
