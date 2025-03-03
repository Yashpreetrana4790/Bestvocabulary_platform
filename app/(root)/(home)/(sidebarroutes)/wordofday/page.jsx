'use client'
import React from "react";

import { PageHeaderHeading, PageHeader, PageHeaderDescription } from "@/components/page-header.jsx"
import wordlist from "@/word_list.json"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { capitalizeString } from "@/lib/helper"
import { HighlightedHead } from "@/components/HighlightedHead"
import { useEffect, useState } from "react"

const Page = () => {
  const [oneWord, setOneWord] = useState(null)

  const max = 5000

  useEffect(() => {
    const num = getRandomInt(max)
    const word = wordlist[num]
    setOneWord(word)
  }, [])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  return (
    <div>
      <PageHeader>
        <HighlightedHead />
        <PageHeaderHeading>
          {capitalizeString(oneWord?.word || "Loading...")}
        </PageHeaderHeading>
        <PageHeaderDescription>
          <p className="text-lg font-medium mb-2">{oneWord?.response?.pronunciation}</p>
        </PageHeaderDescription>
        <div>
          <span className="hidden md:display p-2 rounded-2xl bg-secondary my-4 mx-10">
            {oneWord?.response?.meanings?.[0]?.subtitle || "Loading..."}
          </span>
        </div>
        <div className="container">
          {oneWord?.response && (
            <div className="mt-4 text-center">
              <p className="text-md">{oneWord.response.meanings?.[0]?.easyMeaning || "Loading..."}</p>
            </div>
          )}
        </div>
        <Card className="my-4 rounded-none lg:min-w-7xl mx-2">
          <CardHeader>
            <CardTitle className="text-xl text-black dark:text-white text-center font-bold">
              Common Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {oneWord?.response?.meanings?.map((meaning, index) => (
              <div key={index} className="mb-2">
                {meaning?.common_usage?.map((usage, idx) => (
                  <div key={idx}>
                    <CardTitle className="text-md text-black dark:text-white">{usage?.context}</CardTitle>
                    <CardDescription>
                      <p className="text-base text-muted-foreground mb-2">Example: {usage?.example}</p>
                    </CardDescription>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </PageHeader>
    </div>
  )
}

export default Page
