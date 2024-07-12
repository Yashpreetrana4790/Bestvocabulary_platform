import React from 'react'

const Footer = () => {
  return (
    <>
      <footer class="bg-gray-900 text-gray-300 mt-auto py-4">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <div>
              <p>&copy; 2024 Best Vocabulary </p>
            </div>
            <div className='hidden md:block'>
              <ul class="flex space-x-4">
                <li><a href="#" class="hover:text-gray-400">Home</a></li>
                <li><a href="#" class="hover:text-gray-400">Words</a></li>
                <li><a href="#" class="hover:text-gray-400">Trending Words</a></li>
                <li><a href="#" class="hover:text-gray-400">Ask Ai</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer