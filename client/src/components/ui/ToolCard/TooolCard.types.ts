import type{ LucideIcon } from "lucide-react";

export interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}