'use client'
import wordlist from "@/word_list.json"
import React from "react"

import { PageHeaderHeading, PageHeader, PageHeaderDescription } from "@/components/page-header.jsx"
import { Shuffle } from "lucide-react"
import { capitalizeString } from "@/lib/helper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"


const Learn = () => {
  const [oneWord, setOneWord] = useState(null)
  const [type, setType] = useState("word")
  const [selectedLevel, setSelectedLevel] = useState("Beginner")
  const max = wordlist.length

  const handleGetRandomWord = () => {
    
    const num = Math.floor(Math.random() * max)
    setOneWord(wordlist[num])
  }

  React.useEffect(() => {
    handleGetRandomWord()
  }, [])

  const handleSelect = (level) => {
    setSelectedLevel(level)
  }

  return (
    <div className="container mx-auto">
      {/* Random Search Button */}
      <div className="flex justify-center justify-items-center mt-10">

        <Button
          className="flex items-center gap-2  px-4 py-4  rounded-2xl text-md text-white dark:text-black"
          onClick={handleGetRandomWord}
        >
          Random Search <Shuffle className="inline-block" />
        </Button>
      </div>


      {/* Conditionally render content for words or phrases */}
      {type === "word" ? (
        <PageHeader className="py-10">
          <PageHeaderHeading >
            {capitalizeString(oneWord?.word || "Loading...")}
          </PageHeaderHeading>
          <PageHeaderDescription>
            <p className="text-lg font-medium mb-2"> {oneWord?.response?.pronunciation}</p>
          </PageHeaderDescription>
          <div>
            <span className="p-2 rounded-2xl bg-secondary my-4 mx-10 ">{oneWord?.response?.meanings?.[0]?.subtitle || "Loading..."}</span>
          </div>
          <div className="container">
            {oneWord?.response && (
              <div className="mt-4 text-center">
                <p className="text-md">{oneWord.response.meanings?.[0]?.easyMeaning || "Loading..."}</p>
              </div>
            )}
          </div>

          <div>
            <Card className="mt-10 ">
              <CardHeader className="p-0">
                <CardTitle className="text-black dark:text-white border-b  p-4">Examples</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 px-6">
                {oneWord?.response?.meanings?.[0]?.example_sentences?.length > 0 ? (
                  oneWord.response.meanings[0].example_sentences.map((example, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-md">{example}</p>
                    </div>
                  ))
                ) : (
                  <p>No examples available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </PageHeader>

      ) : (
        <div>
          <PageHeaderHeading>
            {oneWord?.word ? capitalizeString(oneWord.word) : "Loading..."}
          </PageHeaderHeading>

          <PageHeaderDescription>
            <p className="text-lg font-medium mb-2 text-center">
              {oneWord?.response?.pronunciation || "No pronunciation available"}
            </p>
          </PageHeaderDescription>

          {oneWord?.response?.meanings?.[0]?.subtitle && (
            <div>
              <span className="p-2 rounded-2xl bg-secondary text-center my-4 mx-10">
                {oneWord.response.meanings[0].subtitle}
              </span>
            </div>
          )}

          {oneWord?.response?.meanings?.[0]?.easyMeaning && (
            <div className="container mt-4 text-center">
              <p className="text-md">{oneWord.response.meanings[0].easyMeaning}</p>
            </div>
          )}

          {/* Examples Section */}
          <div>
            <Card className="mt-10">
              <CardHeader className="pt-6 px-6">
                <CardTitle className="text-black dark:text-white">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                {oneWord?.response?.meanings?.[0]?.example_sentences?.length > 0 ? (
                  oneWord?.response.meanings[0]?.example_sentences?.map((example, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-md">{example}</p>
                    </div>
                  ))
                ) : (
                  <p>No examples available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default Learn
