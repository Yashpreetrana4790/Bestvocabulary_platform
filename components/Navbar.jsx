import { sidebarLinks } from '@/constants';
import Button from './Button';
import Link from 'next/link';
import { auth, signOut } from '@/auth';

const Navbar = async () => {



  const session = await auth()



  return (
    <div className='w-full  navbar '>

      <div className='container  pt-3'>
        <div className='flex justify-between   py-3 items-center min-h-16  md:mt-5 rounded-full px-3 bg-gray-200  '>
          <div className='flex gap-1 items-center'>
            <span className="pi pi-bars md:hidden block " style={{ fontSize: '1em', cursor: 'pointer' }} ></span>
            <Link href="/" className='text-2xl   px-2 font-bold text-red-900 font-playfair'> Logophile</Link>
          </div>
          <div className='flex gap-4 items-center '>

            <div className=' md:flex hidden gap-5 '>
              {sidebarLinks?.map((x) => {
                return (
                  <>
                    <Link href={x.route}>

                      <p key={x.id} className='text-gray-800 font-semibold font-merriam'>{x?.label}</p>
                    </Link>
                  </>
                )
              })}

            </div>
          </div>
          <div className='flex gap-2 items-center '>

            {
              session ? (
                <>
                  <Button label="Dashboard" icon="pi pi-user" type="secondary" className="md:block hidden" />
                  <form
                    action={async (formData) => {
                      "use server"
                      await signOut()
                    }}
                  >
                    <Button label="Logout" icon="pi pi-user" type="secondary" />
                  </form>
                </>
              ) :
                <Link href="/login" className='px-2'>
                  <Button label="Login" icon="pi pi-user" type="secondary" />
                </Link>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar