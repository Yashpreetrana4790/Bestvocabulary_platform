'use client'
import { useEffect } from "react"
import React from "react"

export default function Home() {
  useEffect(() => {
    console.log("useEffect rendering on home page")

  }, [])

  return (
    <>
      Home page
    </>
  )
}
