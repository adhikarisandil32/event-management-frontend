import React from "react"

export default function ProfileIcon({ currentUser }) {
  return <span>Hello, {currentUser?.fullName}</span>
}
