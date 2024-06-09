import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div>
      <div className="container">
        <div className="min-h-[calc(100vh-105px)] flex items-center justify-center text-3xl text-center font-bold">
          <div>
            Welcome To <br />
            Event Management <br />
            {currentUser ? (
              <>
                See Your{" "}
                <Link className="underline text-blue-800" to="/events">
                  Events
                </Link>
              </>
            ) : (
              <>
                <Link className="underline text-blue-800" to="/login">
                  Log In
                </Link>{" "}
                to See Your Events
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
