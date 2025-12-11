import { SideBarItemsProps } from "./SideBarItems.types";

export function SideBarItems(props: SideBarItemsProps) {
  const { item } = props;
  const { href, icon, label } = item;
  return <div>SideBarItems</div>;
}
