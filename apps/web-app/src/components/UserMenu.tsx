"use client";
import { Avatar, Box, Group, Menu, rem, Text, UnstyledButton } from "@mantine/core";
import type { User } from "oidc-client-ts";
import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import ErrorBoundary from "./ErrorBoundary";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";

const encoder = new TextEncoder();

async function getGravatarUrl(user: User | null | undefined) {
  if (!user) {
    return "N/A";
  }
  const email = user.profile.email;
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((item) => item.toString(16).padStart(2, "0")).join("");
  return `https://gravatar.com/avatar/${hash}`;
}

export default function UserMenu() {
  const auth = useAuth();
  const [gravatarUrl, setGravatarUrl] = useState<string>();
  useEffect(() => {
    async function calculateGravatarUrl() {
      const url = await getGravatarUrl(auth.user);
      setGravatarUrl(url);
    }
    calculateGravatarUrl();
  }, []);

  return (
    <ErrorBoundary>
      <Menu
        width={200}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right", duration: 150 }}
        withinPortal
        shadow="md"
      >
        <Menu.Target>
          <UnstyledButton
            style={{
              padding: "8px 12px",
              transition: "background-color 100ms ease",
            }}
          >
            <Group gap="xs">
              <Avatar src={gravatarUrl} alt={auth.user?.profile.name} radius="xl" size={38} />

              <Box style={{ textAlign: "left" }}>
                <Text size="sm" fw={500} lh={1.1}>
                  {auth.user?.profile.name}
                </Text>
                <Text size="xs" c="dimmed" lh={1.1}>
                  {auth.user?.profile.email}
                </Text>
              </Box>

              <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.8} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.6} />}
            onClick={() => console.log("Navigate → Account / Profile / Settings")}
          >
            Account
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.6} />}
            onClick={() => void auth.removeUser()}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </ErrorBoundary>
  );
}
