import React, { useState } from "react";
import { Plus, CalendarDays, ListTodo, User, LogOut, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import UserDropdown from "@/components/modal/UserDropdown";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col md:flex-row ">
      {/* Navbar for small devices */}
      <div className="w-full bg-gray-900 text-white flex items-center flex-row-reverse justify-between p-4 md:hidden">
        <div className="text-xl font-bold">Daily ToDo</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-800 rounded-md">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 bg-gray-900 text-white flex flex-col h-full transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 z-50  pt-6 md:mt-0 md:pt-0`}
      >
        {/* Close button  */}
        <div className="md:hidden flex items-center justify-between w-full">

          <div className=" text-xl font-bold px-4 md:hidden"> Dashboard</div>

          <button
            onClick={() => setSidebarOpen(false)}
            className=" bg-gray-800 rounded-md mr-4"
          >

            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 text-xl lg:text-2xl font-bold hidden md:block"> Daily ToDo</div>
        <p className="pl-4 -mt-3 text-xs font-mono">Developed By Yead</p>
        {/* <div className="p-4 text-xl font-bold  md:block">Todo Dashboard</div> */}
        <nav className="flex-1 px-2 space-y-2 pt-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            <ListTodo className="mr-2 h-5 w-5" /> All Tasks
          </NavLink>
          <NavLink
            to="/today"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            <CalendarDays className="mr-2 h-5 w-5" /> Today
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            <CalendarDays className="mr-2 h-5 w-5" /> Upcoming
          </NavLink>
        </nav>
        {/* User Section */}
        <UserDropdown></UserDropdown>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
}
