import React from 'react'

const FeaturedCardGroup = () => {
  return (
    <section className="w-full pb-12 md:pb-[60px] lg:pb-12">
      <div className="container mx-auto">
        <div className=" md:flex max-md:flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
            <h3 className="text-2xl font-bold font-playfair text-red-900">Daily Word Practice</h3>
            <p className="text-muted-foreground font-opensans">
              Improve your vocabulary with our daily word practice sessions. Learn new words, reinforce existing ones,
              and track your progress.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
            <h3 className="text-2xl font-bold font-playfair text-red-900">Vocabulary Quizzes</h3>
            <p className="text-muted-foreground font-opensans">
              Test your knowledge with our engaging vocabulary quizzes. Challenge yourself and see how much you've
              learned.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 bg-gray-100  rounded-lg p-4">
            <h3 className="text-2xl font-bold font-playfair text-red-900">Performance Tracking</h3>
            <p className="text-muted-foreground font-opensans">
              Tailor your learning experience with our personalized recommendations. We'll suggest words and exercises
              based on your strengths and weaknesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCardGroup