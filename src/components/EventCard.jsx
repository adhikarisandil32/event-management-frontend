import React from "react"
import { useNavigate } from "react-router-dom"

export default function EventCard({ eventInfo }) {
  const navigate = useNavigate()

  const handleDelete = async (idForDeletion) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
      method: "DELETE",
      body: JSON.stringify({ id: idForDeletion }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
  }

  return (
    <div className="p-4 w-full rounded-md bg-gradient-to-b from-green-200 to-green-100 flex flex-col justify-between shadow-md">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-center">{eventInfo.title}</h2>

        <div className="text-justify line-clamp-6">
          <span>{eventInfo.description}</span>
        </div>
      </div>

      <div className="space-y-1 mt-4">
        <div className="text-justify">
          <button
            className="w-full py-2 text-center bg-blue-900 text-white rounded-md"
            onClick={() => navigate(`/events/${eventInfo.slug}`)}
          >
            More Details
          </button>
        </div>

        <div className="text-justify">
          <button
            className="w-full py-2 text-center bg-red-900 text-white rounded-md"
            onClick={() => handleDelete(eventInfo._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
