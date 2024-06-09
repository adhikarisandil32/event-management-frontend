import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [fetchUser, setFetchUser] = useState(false) // to trigger re-render when user logs in again

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const responseJSON = await response.json()

      return setCurrentUser(responseJSON?.success ? responseJSON.data : null)
    }

    getUser()
  }, [fetchUser])

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, setFetchUser }}>{children}</AuthContext.Provider>
}
