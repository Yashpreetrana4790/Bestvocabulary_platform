import Button from "@/components/Button"
import Link from "next/link"


export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="w-full  py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter  sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your English Vocabulary
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl">
            Unlock the power of words with our comprehensive vocabulary learning platform. Discover new words, practice
            daily, and master the English language.
          </p>
          <Link
            href="/words"
            prefetch={false}
          >
            <Button label="Words Treasure">
            </Button>
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-12">
        <div className="container mx-auto">

          <div className=" md:flex max-md:flex-col justify-center items-center gap-4">
            <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
              {/* <CalendarDays /> */}
              <h3 className="text-2xl font-bold">Daily Word Practice</h3>
              <p className="text-muted-foreground">
                Improve your vocabulary with our daily word practice sessions. Learn new words, reinforce existing ones,
                and track your progress.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
              <h3 className="text-2xl font-bold">Vocabulary Quizzes</h3>
              <p className="text-muted-foreground">
                Test your knowledge with our engaging vocabulary quizzes. Challenge yourself and see how much you've
                learned.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
              <h3 className="text-2xl font-bold">Personalized Learning</h3>
              <p className="text-muted-foreground">
                Tailor your learning experience with our personalized recommendations. We'll suggest words and exercises
                based on your strengths and weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-12 lg:py-12">
        <div className="flex flex-col items-start gap-4 p-4">
          <div className="inline-block rounded-lg px-3 py-1 text-sm text-white bg-black">
            Vocabulary Focus
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mastering Vocabulary</h2>
          <p className="text-muted-foreground md:text-xl">
            Dive into our collection of vocabulary-focused content to expand your word knowledge.
          </p>

          <div className="flex flex-col lg:flex-row w-full items-center">
            <div className="flex-1 p-4">
              <div className="grid grid-cols-2 gap-4 w-full  place-content-center ">
                <div className="bg-gray-100 rounded-xl p-12">Card 1</div>
                <div className="bg-gray-100 rounded-xl p-12">Card 2</div>
                <div className="bg-gray-100 rounded-xl p-12">Card 3</div>
                <div className="bg-gray-100 rounded-xl p-12">Card 4</div>
              </div>
            </div>

            <div className="flex-1 bg-gray-100 p-4">
              <h2 className="text-xl font-bold">Second Section</h2>
              <p>This is the second section content.</p>
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}



