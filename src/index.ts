import r2wc from "@r2wc/react-to-web-component";
import { Header } from "./Header";
import { Form } from "./BasicForm";
import { WrapperForm } from "./Form";

// export * from "./Header";

// index.ts
// export * from "./Button";
export * from "./Header";
export * from "./BasicForm";
export * from "./Form";

customElements.define(
  "rwc-header",
  r2wc(Header, {
    props: { text: "string", image: "string" },
  })
);

customElements.define(
  "rwc-form",
  r2wc(Form, {
    props: { handleOnSubmit: "function" },
  })
);

customElements.define(
  "rwc-dinamyc-form",
  r2wc(WrapperForm, {
    props: { formConfig: "json", onSubmit: "function" },
  })
);
