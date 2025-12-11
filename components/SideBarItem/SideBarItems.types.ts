import { LucideIcon } from "lucide-react";

export type SideBarItemsProps = {
  item: {
    label: string;
    icon: LucideIcon;
    href: string;
  };
  key: string;
};
