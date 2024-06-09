import React from "react"
import { Link } from "react-router-dom"
import ProfileIcon from "./ProfileIcon"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { currentUser, setCurrentUser } = useAuth()

  const handleLogout = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const responseJSON = await response.json()

    if (responseJSON.success) return setCurrentUser(null)
  }

  return (
    <div className="bg-gradient-to-b from-slate-200 to-white sticky top-0">
      <div className="container">
        <div className="py-8 flex justify-between items-center">
          <div>
            <Link className="px-2" to="/">
              Home
            </Link>

            <Link className="px-2" to="/events">
              Events
            </Link>
          </div>

          <div className="space-x-2">
            {currentUser && <ProfileIcon currentUser={currentUser} />}

            {!currentUser && (
              <Link className="px-4 py-2 text-white bg-blue-800 border border-blue-800 rounded-lg" to="/login">
                Login
              </Link>
            )}

            {!currentUser && (
              <Link className="px-4 py-2 border border-blue-800 rounded-lg" to="/register">
                Register
              </Link>
            )}

            {currentUser && (
              <button
                className="px-4 py-2 text-white bg-red-600 border border-red-600 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
