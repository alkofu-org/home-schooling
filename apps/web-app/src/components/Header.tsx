"use client";
import { Burger, Group, Title } from "@mantine/core";
import ErrorBoundary from "./ErrorBoundary";
import UserMenu from "./UserMenu";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <ErrorBoundary>
      <Group h="100%" px="md" justify="space-between" align="center">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title>Header has a burger icon below sm breakpoint</Title>
        </Group>
        <UserMenu />
      </Group>
    </ErrorBoundary>
  );
}
