import { sidebarLinks } from '@/constants';
import Button from './Button';
import Link from 'next/link';
import { Menubar } from 'primereact/menubar';
const Navbar = () => {




  const items = [

    {
      label: 'More',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Dictionary',
          icon: 'pi pi-book',
          url: '/dictionary'
        },
        {
          label: 'Ask AI',
          icon: 'pi pi-sparkles',
          url: '/'
        },


      ]
    },

  ];

  return (
    <div className='w-full  navbar '>

      <div className='container  p-4 sm:p-0'>
        <div className='flex justify-between sm:mx-5 py-3 items-center min-h-16  mt-5 rounded-full px-3 bg-gray-200  '>
          <Link href="/" className='text-xl  px-2 font-bold text-black font-playfair'> Best Vocabulary</Link>
          <div className='flex gap-4 items-center '>

            <div className=' md:flex hidden gap-5 '>
              {sidebarLinks?.map((x) => {
                return (
                  <>
                    <Link href={x.route}>

                      <p key={x.id} className='text-gray-800 font-bold font-opensans'>{x?.label}</p>
                    </Link>
                  </>
                )
              })}

            </div>
            <Menubar model={items} className='text-bold lg:block hidden ' />
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