import r2wc from "@r2wc/react-to-web-component";
import { Header } from "./Header";

// export * from "./Header";

// index.ts
// export * from "./Button";
export * from "./Header";

customElements.define(
  "rwc-header",
  r2wc(Header, {
    props: { text: "string", image: "string" },
  })
);
