import type { Metadata } from "next";
import { DesignSystemContent } from "./design-system-content";

export const metadata: Metadata = {
  title: "Design System",
};

export default function DesignSystemPage() {
  return <DesignSystemContent />;
}
