import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./header.scss?inline";

export default component$(() => {
  useStyles$(styles);

  return <></>;
});
