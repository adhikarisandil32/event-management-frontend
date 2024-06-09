import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function NewEventForm({ showAddEventForm, setShowAddEventForm, setTriggerRerender }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [postError, setPostError] = useState("")

  const submitFn = async (formData) => {
    setPostError("")

    const data = {
      title: formData.eventName,
      description: formData.eventDescription,
      numberOfParticipants: formData.numberOfParticipants,
      startDate: formData.startDate,
      endDate: formData.endDate,
      entryFee: formData.entryFee,
      organizer: formData.organizerName,
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    const responseJSON = await response.json()

    if (!responseJSON?.success) {
      setPostError(responseJSON?.message)
      return setTimeout(() => setPostError(""), 1500)
    } else {
      setTriggerRerender((prev) => !prev)
      return setShowAddEventForm(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showAddEventForm])

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-sm"
        onClick={() => setShowAddEventForm(false)}
      ></div>

      <div className="fixed py-8 left-0 right-0 bottom-0 h-[75vh] bg-yellow-300 rounded-t-3xl">
        {postError && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-800 rounded-md py-4 px-8 text-white">
            {postError}
          </div>
        )}

        <div className="container">
          <div className="text-right">
            <button className="p-2" onClick={() => setShowAddEventForm(false)}>
              ❌
            </button>
          </div>

          <form onSubmit={handleSubmit(submitFn)} className="space-y-6">
            <div className="flex gap-8">
              <div className="w-1/2 flex flex-col">
                <label className="font-semibold">Event Title*</label>
                <input
                  type="text"
                  className="outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  placeholder="Enter Event Title"
                  {...register("eventName", { required: "Event Name Required" })}
                />
                {errors.eventName && <span className="text-xs text-red-600">{errors.eventName.message}</span>}
              </div>

              <div className="w-1/2 flex flex-col">
                <label className="font-semibold">Organizer*</label>
                <input
                  type="text"
                  className="outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  placeholder="Enter Organizer's Name"
                  {...register("organizerName", { required: "Orgainzer's Name Required" })}
                />
                {errors.organizerName && <span className="text-xs text-red-600">{errors.organizerName.message}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Event Description*</label>
              <textarea
                rows="5"
                className="outline-none border border-black rounded-md px-2 py-1 resize-none bg-white/25"
                placeholder="Enter Event Description"
                {...register("eventDescription", { required: "Event Description Required" })}
              />
              {errors.eventDescription && (
                <span className="text-xs text-red-600">{errors.eventDescription.message}</span>
              )}
            </div>

            <div className="flex gap-8">
              <div className="w-1/4 flex flex-col">
                <label className="font-semibold">Number Of Participants*</label>
                <input
                  type="number"
                  className="w-full outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  placeholder="Number Of Participants"
                  {...register("numberOfParticipants", { required: "Participants' Number Required" })}
                />
                {errors.numberOfParticipants && (
                  <span className="text-xs text-red-600">{errors.numberOfParticipants.message}</span>
                )}
              </div>

              <div className="w-1/4 flex flex-col">
                <label className="font-semibold">Entry Fee*</label>
                <input
                  type="number"
                  className="w-full outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  placeholder="Enter Entry Fee"
                  {...register("entryFee", { required: "Entry Fee Required" })}
                />
                {errors.entryFee && <span className="text-xs text-red-600">{errors.entryFee.message}</span>}
              </div>

              <div className="w-1/4 flex flex-col">
                <label className="font-semibold">Start Date*</label>
                <input
                  type="date"
                  className="w-full outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  {...register("startDate", { required: "Start Date Required" })}
                />

                {errors.startDate && <span className="text-xs text-red-600">{errors.startDate.message}</span>}
              </div>

              <div className="w-1/4 flex flex-col">
                <label className="font-semibold">End Date*</label>
                <input
                  type="date"
                  className="w-full outline-none border border-black rounded-md px-2 py-1 bg-white/25"
                  {...register("endDate", { required: "End Date Required" })}
                />
                {errors.endDate && <span className="text-xs text-red-600">{errors.endDate.message}</span>}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="px-6 py-2 rounded-md bg-blue-800 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
