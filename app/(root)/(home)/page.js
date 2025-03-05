'use client'

import Herobanner from "@/components/HomePageComponents/Herobanner"
import NewLight from "@/components/HomePageComponents/NewLight"
import NoMatter from "@/components/HomePageComponents/NoMatter"
import { useEffect } from "react"
import React from "react"

export default function Home() {
  useEffect(() => {
    console.log("useEffect rendering on home page")

  }, [])

  return (
    <>
      <Herobanner />
      <NewLight />
      <NoMatter />

    </>
  )
}
