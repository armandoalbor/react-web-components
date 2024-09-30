// import React from "react";
// import * as ReactDOMClient from "react-dom/client";
// // import reactToWebComponent from "react-to-webcomponent";

// import { Header } from "./Header";

// customElements.define(
//   "rwc-header",
// //   reactToWebComponent(Header, React, ReactDOMClient, {
// //     props: ["text"],
// //   })
// );

class EventBus {
  private eventListeners: { [key: string]: Array<(data: any) => void> } = {};

  constructor() {
    window.addEventListener("message", this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent) {
    const { type, data } = event.data;
    if (this.eventListeners[type]) {
      this.eventListeners[type].forEach((callback) => callback(data));
    }
  }

  public on(type: string, callback: (data: any) => void) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(callback);
  }

  public off(type: string, callback: (data: any) => void) {
    if (!this.eventListeners[type]) return;
    this.eventListeners[type] = this.eventListeners[type].filter(
      (cb) => cb !== callback
    );
  }

  public emit(type: string, data: any) {
    window.postMessage({ type, data }, "*"); // Cambia '*' a un origen específico
  }
}

// Uso del EventBus
const eventBus = new EventBus();

// Escuchar eventos
eventBus.on("testEvent", (data) => {
  console.log("Received testEvent with data:", data);
});

// Emitir eventos
eventBus.emit("testEvent", { message: "Hello, World!" });
