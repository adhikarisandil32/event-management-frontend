import React from "react"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Events from "./pages/Events"
import Event from "./pages/Event"
import Login from "./components/Login"
import Register from "./components/Register"
import ActiveUserRoute from "./components/ActiveUserRoute"
import InactiveUserRoute from "./components/InactiveUserRoute"
import { useAuth } from "./contexts/AuthContext"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: (
          <ActiveUserRoute>
            <Events />
          </ActiveUserRoute>
        ),
      },
      {
        path: "/events/:slug",
        element: (
          <ActiveUserRoute>
            <Event />
          </ActiveUserRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <InactiveUserRoute>
            <Login />
          </InactiveUserRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <InactiveUserRoute>
            <Register />
          </InactiveUserRoute>
        ),
      },
    ],
  },
])

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
