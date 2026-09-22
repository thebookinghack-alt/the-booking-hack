import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/offerte")({
  component: () => <Outlet />,
});
