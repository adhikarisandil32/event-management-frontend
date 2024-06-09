import React, { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ActiveUserRoute({ children }) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // useNavigate should be an action or an action of a useEffect function
  // it can't be written as if (!currentUser) return navigate("/login") without useEffect
  useEffect(() => {
    if (!currentUser) return navigate("/login")
  }) // every time this component is rendered, this effect is required to run, hence no dependency

  return <>{children}</>
}
