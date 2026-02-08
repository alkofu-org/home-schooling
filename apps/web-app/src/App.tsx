import { useAuth } from "react-oidc-context";
import Home from "./pages/Home";

export default function App() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing in silently...</div>;
    case "signoutRedirect":
      return <div>Signing out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops, an error occurred: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <Home />;
  }

  return <button onClick={() => auth.signinRedirect()}>Log in</button>;
}
