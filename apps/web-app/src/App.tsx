import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function App() {
  return (
    <MantineProvider>
      <>
        <h1>Hello, Mantine!</h1>
      </>
    </MantineProvider>
  );
}
