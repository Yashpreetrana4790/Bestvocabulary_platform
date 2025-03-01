'use client'
import * as React from "react"
import wordlist from "@/word_list.json"

import { PageHeaderHeading, PageHeader, PageHeaderDescription } from "@/components/page-header.jsx"
import { Shuffle } from "lucide-react"
import { capitalizeString } from "@/lib/helper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"


const Learn = () => {
  const [oneWord, setOneWord] = React.useState(null)
  const [type, setType] = React.useState("word")
  const [selectedLevel, setSelectedLevel] = React.useState("Beginner")
  const max = wordlist.length

  const handleGetRandomWord = () => {
    console.log("Random word")
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
      <div className="flex my-5 gap-2 mb-5 w-full justify-between">
        <div>
          <Select>
            <SelectTrigger className="rounded-2xl px-4 py-1">
              Beginner
            </SelectTrigger>
            <SelectContent sideOffset={8} className="rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
              <SelectItem disabled className="opacity-50 cursor-default">Select Level</SelectItem>
              <SelectItem onValueChange={() => handleSelect("Beginner")}>Beginner</SelectItem>
              <SelectItem onValueChange={() => handleSelect("Intermediate")}>Intermediate</SelectItem>
              <SelectItem onValueChange={() => handleSelect("Advanced")}>Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">

          <Button className="rounded-2xl px-4 py-1" onClick={() => setType("word")}>
            Learn Idiom
          </Button>
          <Button className="rounded-2xl px-4 py-1" onClick={() => setType("phrase")}>
            Learn Phrases and Idioms
          </Button>
        </div>
      </div>

      {/* Random Search Button */}
      <div className="flex justify-center justify-items-center">


        <Button
          className="flex items-center gap-2 bg-gray-600 px-4 py-4 mb-10 rounded-2xl text-md text-white dark:text-black"
          onClick={handleGetRandomWord}
          size="xl"
        >
          Random Search <Shuffle className="inline-block" />
        </Button>
      </div>


      {/* Conditionally render content for words or phrases */}
      {type === "word" ? (
        <PageHeader>
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
