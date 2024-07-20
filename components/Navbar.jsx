import { sidebarLinks } from '@/constants';
import Button from './Button';
import Link from 'next/link';

const Navbar = () => {

  return (
    <div className='w-full  '>

      <div className='container  p-4 sm:p-0'>
        <div className='flex justify-between sm:mx-5 py-3 items-center min-h-16  mt-5 rounded-full px-3 bg-gray-200  '>
          <Link href="/" className='text-xl  px-2 font-bold text-black font-playfair'> Best Vocabulary</Link>
          <div className=' md:flex hidden gap-5 '>
            {sidebarLinks?.map((x) => {
              return (
                <Link href={x.route}>

                  <p key={x.id} className='text-gray-800 font-bold font-opensans'>{x?.label}</p>
                </Link>
              )
            })}
          </div>
          <div className='px-2'>
            <Button label="Login" icon="pi pi-user" type="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar