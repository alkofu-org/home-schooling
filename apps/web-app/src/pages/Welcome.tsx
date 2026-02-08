import { useAuth } from "react-oidc-context";
import { Box, Button, Center, Stack, Title } from "@mantine/core";

export default function Welcome() {
  const auth = useAuth();

  return (
    <Box h="100vh" w="100vw">
      <Center style={{ width: "100%", height: "100%" }}>
        <Stack>
          <Title order={1}>Welcome to Home Schooling Portal!</Title>
          <Button onClick={() => auth.signinRedirect()}>Log in</Button>
        </Stack>
      </Center>
    </Box>
  );
}
