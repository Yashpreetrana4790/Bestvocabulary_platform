'use client'
import React from "react"

import { PageHeaderHeading, PageHeader, PageHeaderDescription } from "@/components/page-header.jsx"
import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { capitalizeString } from "@/lib/otherutil"


const Learn = () => {
  const [oneWord, setOneWord] = useState(null)
  const [type, setType] = useState("word")
  const [selectedLevel, setSelectedLevel] = useState("Beginner")
  // const max = wordlist.length


  const handleGetRandomWord = () => {

    // const num = Math.floor(Math.random() * max)
    // setOneWord(wordlist[num])
  }



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
            <p className="p-2 rounded-2xl  underline underline-offset-2 decoration-pink-500 text-center mx-10  leading-8">
              {oneWord?.response?.meanings[0].subtitle}
            </p>
          </div>
          <div className="container">
            {oneWord?.response && (
              <div className=" text-center">
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
            <>
              <span className="p-2 rounded-2xl  underline underline-offset-2 decoration-pink-500 text-center my-4 mx-10  leading-8">
                {oneWord?.response?.meanings[0].subtitle}
              </span>
            </>
          )}

          {oneWord?.response?.meanings?.[0]?.easyMeaning && (
            <div className=" mt-1 text-center">
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
