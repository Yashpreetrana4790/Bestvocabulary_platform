import WordCard from "@/components/cards/WordCard"

const page = () => {
  return (
    <div className="container mx-auto">
      <div className="  mt-10 mb-10">
        <div className="flex justify-center gap-5">
          <div className="min-w-[200px] "> sidebar</div>
          <div className="grid grid-cols-3 gap-4   place-content-center">
            <WordCard />
            <WordCard />
            <WordCard />
            <WordCard />
            <WordCard />
            <WordCard />
          </div>
        </div>

      </div>
    </div>
  )
}

export default page