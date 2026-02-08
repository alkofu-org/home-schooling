import { WebStorageStateStore } from "oidc-client-ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

const oidcConfig: AuthProviderProps = {
  authority: "https://dev-6lxlqkwo3p3aahj0.us.auth0.com/",
  client_id: "BGSAHz019yEno5EsOTCB4I9CwchB6xkq",
  redirect_uri: "http://localhost:5173/",
  scope: "openid profile email",
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
);
