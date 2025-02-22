import Dashboard from "@/dasboard/Dashboard";
import AllTask from "@/Pages/AllTask";
import Today from "@/Pages/Today";
import Upcoming from "@/Pages/Upcoming";
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
            },
            {
                path: '/today',
                element: <Today></Today>
            },
            {
                path: '/upcoming',
                element: <Upcoming></Upcoming>
            },
        ]
    },
]);

export default router