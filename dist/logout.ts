export function Logout() {
  const linkLogout = document.querySelector("[data-logout]");

  linkLogout?.addEventListener("click", () => {
    window.localStorage.removeItem("token");
    window.location.href = "../../index.html";
  });
}
