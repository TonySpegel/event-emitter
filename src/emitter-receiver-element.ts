/**
 * Example implementation for using the eventEmitter decorator.
 *
 * Copyright © 2023 Tony Spegel
 */

import { eventEmitter } from './event-emitter.js';

class EmitterElement extends HTMLElement {
  #counter: number = 0;

  @eventEmitter({ name: 'counter-event' })
  increase(): number {
    return (this.#counter += 1);
  }

  @eventEmitter({ name: 'counter-event' })
  decrease(): number {
    return (this.#counter -= 1);
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `
      <h2>Emitter</h2>
      <button id="dec">-</button>
      <button id="inc">+</button>
    `;
  }

  connectedCallback() {
    this.shadowRoot!.querySelector('#inc')?.addEventListener('click', () => {
      this.increase();
    });

    this.shadowRoot!.querySelector('#dec')?.addEventListener('click', () => {
      this.decrease();
    });
  }
}

class ReceiverElement extends HTMLElement {
  #counter: number = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `
      <h2>Receiver</h2>
      <span id="counter-value">${this.#counter}</span>
    `;
  }

  connectedCallback() {
    window.addEventListener('counter-event', e => {
      const { detail } = e as CustomEvent;

      this.#counter = detail;

      this.shadowRoot!.querySelector('#counter-value')!.innerHTML = String(
        this.#counter
      );
    });
  }
}

customElements.define('emitter-element', EmitterElement);
customElements.define('receiver-element', ReceiverElement);
