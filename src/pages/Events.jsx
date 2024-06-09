import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import EventCard from "../components/EventCard"
import NewEventForm from "../components/NewEventForm"

export default function Events() {
  const [events, setEvents] = useState([])
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [triggerRerender, setTriggerRerender] = useState(false)

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      })
      const responseJSON = await response.json()

      return setEvents(responseJSON.data)
    }

    getEvents()
  }, [triggerRerender])

  return (
    <>
      <div className="container">
        {showAddEventForm &&
          createPortal(
            <NewEventForm
              showAddEventForm={showAddEventForm}
              setShowAddEventForm={setShowAddEventForm}
              setTriggerRerender={setTriggerRerender}
            />,
            document.getElementById("portal")
          )}

        <div className="text-right sticky top-24 left-0 right-0">
          <div className="container">
            <button onClick={() => setShowAddEventForm(true)} className="px-4 py-2 bg-green-900 text-white rounded-md">
              Add Event
            </button>
          </div>
        </div>

        <div className="py-4 grid grid-cols-3 gap-4">
          {events?.map((event) => (
            <EventCard key={event._id} eventInfo={event} setTriggerRerender={setTriggerRerender} />
          ))}
        </div>
      </div>
    </>
  )
}
