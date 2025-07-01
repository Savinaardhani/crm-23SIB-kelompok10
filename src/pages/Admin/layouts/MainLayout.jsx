import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
       
            <div id="app-container" className="bg-gray-100 min-h-screen flex">
           
                <Sidebar />
            
                <div id="main-content" className="flex-1 p-4">
                    <Header />
                    <Outlet />
                </div>
            </div>
    );
};
