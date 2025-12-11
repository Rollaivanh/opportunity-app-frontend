import {
  dataGeneralSidebar,
  dataToolSidebar,
  dataSupportSidebar,
} from "./SidebarRoutes.data";

export function SideBarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-2 md:p-6">
        <p>GENERAL</p>
        {dataGeneralSidebar.map((item) => (
          <p key={item.label}>{item.label}</p>
        ))}
      </div>
    </div>
  );
}
