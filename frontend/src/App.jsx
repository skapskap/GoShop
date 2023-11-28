import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppRouter from "./Router";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppRouter />
    </MantineProvider>
  );
}
