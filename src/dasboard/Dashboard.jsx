import React, { useState } from "react";
import { Plus, CalendarDays, ListTodo, User, LogOut, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import UserDropdown from "@/components/modal/UserDropdown";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/Spinner/Spinner";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useAuth();
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Navbar for small and medium devices */}
      <div className="w-full bg-gray-900 text-white flex items-center flex-row-reverse justify-between p-4 lg:hidden">
        <div className="text-xl font-bold">Daily ToDo</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-800 rounded-md">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Overlay for small and medium devices */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed  top-0 left-0 w-64 bg-gray-900 text-white flex flex-col h-full transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 z-50 pt-6 lg:mt-0 lg:pt-0`}
      >
        {/* Close button (visible only on small and medium screens) */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="text-xl font-bold px-4">Dashboard</div>
          <button onClick={() => setSidebarOpen(false)} className="bg-gray-800 rounded-md mr-4">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 text-xl lg:text-2xl font-bold hidden lg:block">Daily ToDo</div>
        <p className="pl-4 lg:-mt-3 text-xs font-mono">Developed By Yead</p>

        <nav className="flex-1 px-2 space-y-2 pt-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            <ListTodo className="mr-2 h-5 w-5" /> All Tasks
          </NavLink>
          <NavLink
            to="/today"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            <CalendarDays className="mr-2 h-5 w-5" /> Today
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            <CalendarDays className="mr-2 h-5 w-5" /> Upcoming
          </NavLink>
        </nav>

        {/* User Section */}
        <UserDropdown />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[268px]">
        <Outlet />
      </main>
    </div>
  );
}
