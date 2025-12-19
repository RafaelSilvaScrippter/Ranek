interface DadosObj {
  btn: HTMLElement | null;
  appendForm: HTMLElement | null;
}

function criarFormulario(elements: DadosObj) {
  const createForm = document.createElement("form");
  createForm.setAttribute("data-formulario-comprar", "");
  createForm.classList.add("formulario");
  createForm.innerHTML = `
  <label for='nome'>Nome</label>
  <input type='text' name='nome' id='nome'/>
  <label for='email'>Email</label>
  <input type='email' name='email' id='email'/>
  <label for='senha'>Senha</label>
  <input type='password' name='senha' id='senha'/>
  <label for='cep'>CEP</label>
  <input type='number' name='cep' id='cep'/>
  <label for='rua'>Rua</label>
  <input type='number' name='rua' id='rua'/>
  <label for='numero'>Número</label>
  <input type='number' name='numero' id='numero'/>
  <label for='bairro'>Bairro</label>
  <input type='text' name='bairro' id='bairro'/>
  <label for='cidade'>Cidade</label>
  <input type='text' name='cidade' id='cidade'/>
  <label for='estado'>Estado</label>
  <input type='text' name='estado' id='estado'/>
  <button class='btn-secundario'>Finalizar Compra</button>
  `;
  if (elements?.appendForm) {
    elements?.appendForm.appendChild(createForm);
  }
}

export function abrirFormulario(elements: DadosObj | null) {
  if (elements) criarFormulario(elements);
  const formularioAbrir = elements?.appendForm?.querySelector(
    "[data-formulario-comprar]"
  );
  const tituloEnvio = elements?.appendForm?.querySelector(
    "[data-titulo-envio]"
  );
  const dataMain = document.querySelector("[data-produto-unico]");
  const stick = dataMain?.querySelector("[data-div-stick]");
  console.log(stick);
  formularioAbrir?.classList.add("fechado");
  elements?.btn?.addEventListener("click", () => {
    formularioAbrir?.classList.remove("fechado");
    if (elements.btn instanceof HTMLElement) {
      elements.btn.classList.add("none");
      tituloEnvio?.classList.add("ativo");
    }
    stick?.classList.remove("stick");
  });
}
