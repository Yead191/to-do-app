import Dashboard from "@/dasboard/Dashboard";
import AllTask from "@/Pages/AllTask";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/',
                element: <AllTask></AllTask>
            }
        ]
    },
]);

export default router