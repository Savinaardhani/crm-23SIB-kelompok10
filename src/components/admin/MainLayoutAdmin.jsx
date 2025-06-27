import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";

export default function MainLayoutAdmin() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex w-full">
      <SidebarAdmin />
      <div id="main-content" className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
