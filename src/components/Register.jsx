import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

export default function Register() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [serverError, setServerError] = useState()

  const submitFn = async (data) => {
    if (data.password !== data.rePassword) {
      setError("password", {
        message: "Passwords do not match",
      })
      setError("rePassword", {
        message: "Passwords do not match",
      })
      return
    }

    const dataToPost = {
      email: data.email,
      password: data.password,
      fullName: data.name,
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
    const responseJSON = await response.json()

    if (responseJSON.success) {
      setRegisterSuccess(true)
      setTimeout(() => {
        navigate("/login")
        setRegisterSuccess(false)
      }, 1500)
    } else {
      setRegisterSuccess(false)
      setServerError(responseJSON.message)
      setTimeout(() => {
        setServerError("")
      }, 1500)
    }
    return
  }

  return (
    <div className="container">
      <div className="min-h-[calc(100vh-90px)] flex justify-center items-center">
        <div className="relative border-2 border-black px-8 py-6 mx-auto space-y-3 rounded-lg overflow-hidden">
          {registerSuccess && (
            <div className="absolute px-2 flex items-center justify-center left-0 top-0 h-full w-full  bg-black/25">
              <div className="py-2 px-4 rounded-md bg-green-600 text-white">Registration Successful</div>
            </div>
          )}

          {serverError && (
            <div className="absolute px-2 flex items-center justify-center left-0 top-0 h-full w-full bg-black/25">
              <div className="py-2 px-4 rounded-md bg-red-600 text-white">{serverError}</div>
            </div>
          )}
          <div>
            <label className="block">
              Email: {errors.email && <span className="text-red-600 text-xs">{errors.email.message}</span>}
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("email", { required: "Email Required" })}
            />
          </div>

          <div>
            <label className="block">
              Name: {errors.name && <span className="text-red-600 text-xs">{errors.name.message}</span>}
            </label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("name", { required: "Name Required" })}
            />
          </div>

          <div>
            <label className="block">
              Password: {errors.password && <span className="text-red-600 text-xs">{errors.password.message}</span>}
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("password", { required: "Password Required" })}
              onChange={() => clearErrors(["password", "rePassword"])}
            />
          </div>

          <div>
            <label className="block">
              Reenter Password:{" "}
              {errors.rePassword && <span className="text-red-600 text-xs">{errors.rePassword.message}</span>}
            </label>
            <input
              type="password"
              placeholder="Enter Your Password Again"
              className="border border-black rounded-md outline-none px-2 py-1 w-80"
              {...register("rePassword", { required: "Password Required Again" })}
              onChange={() => clearErrors(["password", "rePassword"])}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md text-white bg-blue-900 py-2"
              onClick={handleSubmit(submitFn)}
            >
              Register
            </button>
          </div>

          <div className="text-center">
            Already Have An Account?{" "}
            <Link to="/login" className="text-blue-700 underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
