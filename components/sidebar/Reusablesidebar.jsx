import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import SidebarLearningStats from '../graph/Sidebarlearningstat';
import Link from 'next/link';

const ReusableSidebar = ({ visible, onHide, position, filterItems, activeFilter, handleFilterChange }) => {


  return (
    <Sidebar visible={visible} onHide={onHide} position={position}>
      <div>
        <h2 className="text-2xl mb-4 font-bold text-red-900 font-playfair">Best Vocabulary</h2>
        <p className="text-gray-700 mb-4 font-opensans">
          Welcome to the ultimate platform for mastering English vocabulary!
        </p>
        <h3 className="text-xl mb-2 font-semibold text-gray-700 font-playfair">Filters</h3>
        <div className="mb-3">
          <Accordion multiple>
            {Object.keys(filterItems).map(category => (
              <AccordionTab key={category} header={category} className="font-light font-sm text-red-900 bg-font-bold font-xl rounded-md ! ">
                {Object.keys(filterItems[category]).map(subCategory => (
                  <div key={subCategory} className="mt-2">
                    <h4 className="text-base font-medium mb-2 text-red-900 font-opensans">{subCategory}</h4>
                    {filterItems[category][subCategory].map(item => (
                      <button
                        key={item.value}
                        className={`flex items-center p-2 hover:bg-gray-100 ${activeFilter === item.value ? 'bg-gray-200' : ''}`}
                        onClick={() => handleFilterChange({ value: item.value })}
                      >
                        <i className={`mr-2 ${item.icon}`} />
                        <span className="text-sm font-opensans">{item.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </AccordionTab>
            ))}
          </Accordion>
        </div>
        <div className="mb-3 w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 font-playfair">Quick Practice</h3>
          <Button icon="pi pi-angle-double-right" className=" w-full gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2 ">Start Test Now</Button>
        </div>
        <div className="mb-3 w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 font-playfair">Popular</h3>
          <Link href="/trending">
            <Button icon="pi pi-angle-double-right" className=" w-full mb-1 gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2  " >Trending Words</Button>
          </Link>
          <Link href="/wordoftheday">
            <Button icon="pi pi-angle-double-right" className=" w-full gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2 ">Word of the Day</Button>
          </Link>
        </div>
        <div className="mb-3 w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 font-playfair">Dictionary</h3>
          <Link href="/dictionary">
            <Button icon="pi pi-angle-double-right" className=" w-full mb-1 gap-2 ml-2  font-xl rounded-md bg-red-900 text-white p-2  font-opensans " >A-Z Words</Button>
          </Link>
        </div>

        <h3 className="text-xl mb-2 font-semibold text-gray-700 font-playfair">Learning Stats</h3>
        <div className="mb-3">
          <SidebarLearningStats />
        </div>
        <span className="text-gray-700 font-opensans">@best vocabulary</span>
      </div>
    </Sidebar >
  );
};

export default ReusableSidebar;
