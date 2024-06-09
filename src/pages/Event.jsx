import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useParams } from "react-router-dom"
import EditEventForm from "../components/EditEventForm"

export default function Event() {
  const { slug } = useParams()

  const [event, setEvent] = useState({})
  const [showEditEventForm, setShowEditEventForm] = useState(false)
  const [triggerRerender, setTriggerRerender] = useState(false)

  useEffect(() => {
    const getEvent = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${slug}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const responseJSON = await response.json()

      setEvent(responseJSON.data)
    }
    getEvent()
  }, [triggerRerender])

  return (
    <div>
      {showEditEventForm &&
        createPortal(
          <EditEventForm
            event={event}
            showEditEventForm={showEditEventForm}
            setShowEditEventForm={setShowEditEventForm}
            setTriggerRerender={setTriggerRerender}
          />,
          document.getElementById("portal")
        )}

      <div className="container">
        <div className="grid grid-cols-3x5 gap-8 p-8">
          <div>
            <img
              src="/assets/grafitti.jpg"
              alt="Grafitti Pic"
              className="h-full object-cover object-center rounded-md"
            />
          </div>

          <div className="space-y-4 py-4">
            <h2 className="text-lg font-semibold text-center">{event.title}</h2>

            <p>{event.description}</p>

            <p className="flex justify-between">
              <span>
                <span className="font-semibold">Start Date:</span> {event.startDate?.split("T")[0]}
              </span>

              <span>
                <span className="font-semibold">End Date:</span> {event.endDate?.split("T")[0]}
              </span>
            </p>

            <p className="flex justify-between">
              <span>
                <span className="font-semibold">Participants:</span> {event.numberOfParticipants}
              </span>

              <span>
                <span className="font-semibold">Entry Fee:</span> ${event.entryFee}
              </span>
            </p>

            <p>
              <span className="font-semibold">Organized By:</span> {event.organizer}
            </p>

            <div>
              <button
                onClick={() => setShowEditEventForm(true)}
                className="py-2 px-8 bg-blue-800 text-white rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
