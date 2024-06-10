import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const { setFetchUser } = useAuth()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm()
  const navigate = useNavigate()
  const [serverErrorMessage, setServerErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const submitFn = async (data) => {
    setServerErrorMessage()
    try {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      })
      const responseJSON = await response.json()

      if (responseJSON.success) {
        setIsLoading(false)
        navigate("/events")
        return setFetchUser((prev) => !prev)
      } else {
        setIsLoading(false)
        setServerErrorMessage(responseJSON.message)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <div className="container">
      <div className="min-h-[calc(100vh-90px)] flex justify-center items-center">
        <div className="border-2 border-black px-8 py-6 mx-auto space-y-3 rounded-lg">
          <div>
            <label className="block">
              Email: {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="block border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("email", { required: "Email Required" })}
            />
          </div>

          <div>
            <label className="block">
              Password: {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="block border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("password", { required: "Password Required" })}
            />
          </div>

          {serverErrorMessage && (
            <div className="bg-red-600 py-2 text-center rounded-md text-sm text-white">{serverErrorMessage}</div>
          )}

          <div>
            <button
              type="submit"
              className={`w-full rounded-md text-white bg-blue-900 py-2 ${isLoading ? "opacity-50" : ""}`}
              onClick={handleSubmit(submitFn)}
              disabled={isLoading}
            >
              Log In
            </button>
          </div>

          <div className="text-center">
            New Here?{" "}
            <Link to="/register" className="text-blue-700 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
