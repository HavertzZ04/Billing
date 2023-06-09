import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" assert {type: "css"};

export class myBody extends HTMLElement {
  constructor() {
    super();
  }

  async components() {
    return await (await fetch('view/my-body.html')).text();
  }

  async add() {
    let template = await (await fetch('view/my-body.html')).text();
    document.querySelector("#rowBody").insertAdjacentHTML("beforeend", template);
  }

  connectedCallback() {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styles];
    this.components().then(html => {
      this.innerHTML = html;
      let addButtons = this.querySelectorAll('#add'); // Seleccionar todos los elementos con el atributo id="add"
      addButtons.forEach(button => {
        button.addEventListener("click", this.add.bind(this));
      });
    });
  }
}

customElements.define('my-body', myBody);
