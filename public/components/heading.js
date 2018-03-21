const template = `
  <div class="heading">
    <h1 class="title">2048</h1>
    <div class="scores-container">
      <div class="score-container">123</div>
      <div class="best-container">456</div>
    </div>
  </div>

  <style>
  .heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    font-size: 80px;
    font-weight: bold;
    margin: 0;
  }

  .scores-container {
    display: flex;
    flex-direction: row;
  }

  .scores-container > div {
    background-color: var(--light-bg-brown);
    color: white;
    padding: 20px 25px 10px 25px;
    font-size: 25px;
    font-weight: bold;
    height: 25px;
    margin: 3px;
    border-radius: 3px;
    text-align: center;
    position: relative;
  }

  .scores-container > div:after {
    color: var(--disable-text-white);
    display: block;
    position: absolute;
    width: 100%;
    top: 6px;
    left: 0;
    font-size: 13px;
  }

  .score-container:after {
    content: "SCORE";
  }

  .best-container:after {
    content: "BEST";
  }
  </style>
`;

customElements.define(
  "swiip-heading",
  class Heading extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = template;
    }
  }
);
