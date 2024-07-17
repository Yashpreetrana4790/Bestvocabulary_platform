import { sidebarLinks } from '@/constants';
import Button from './Button';
import Link from 'next/link';

const Navbar = () => {



  return (
    <div className='w-full  '>

      <div className='container  p-4 sm:p-0'>
        <div className='flex justify-between items-center min-h-16  mt-5 rounded-full px-3 bg-gray-200  '>
          <Link href="/" className='text-xl  px-2 font-bold text-pink-800'> Best Vocabulary</Link>
          <div className=' md:flex hidden gap-5 '>
            {sidebarLinks?.map((x) => {
              return (
                <Link href={x.route}>

                  <p key={x.id} className='text-black font-bold'>{x?.label}</p>
                </Link>
              )
            })}
          </div>
          <div className='px-2'>
            <Button label="Login" className='font-bold' type="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar