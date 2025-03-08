import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
        </div>
        <div className="my-5">
          <Button variant="outline" > <Home />  <Link href="/">Return Home</Link></Button>
        </div>
      </div>
    </div>
  )
}
export default NotFound 