'use client'
import WordCard from "@/components/cards/WordCard"

import { Sidebar } from 'primereact/sidebar';
import { useState } from "react";
import { Button } from 'primereact/button';
import { filterItems } from "@/constants";
import { Accordion, AccordionTab } from 'primereact/accordion';
import SidebarLearningStats from "@/components/graph/Sidebarlearningstat";
import ThemeToggle from "@/components/ThemeMode/Theme";
import ReusableSidebar from "@/components/sidebar/Reusablesidebar";
import Heros from "@/components/Header/Heros";
import Searchbar from "@/components/searchbar/Searchbar";

const page = () => {
  const [visible, setVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);


  const handleFilterClick = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };


  const onHide = () => {
    setVisible(false)
  }

  const handleFilterChange = (event) => {
    setActiveFilter(event.value);
    // Implement filter logic based on event.value
  };

  return (
    <div className={`container mx-auto  ${visible ? 'blurred' : ''}`}>
      <div className="  mt-10 mb-10">
        <div className="flex justify-center gap-1 w-full">
          <div className=" w-full hidden  md:flex gap-5 items-start basis-1/12 ">
            <div className="bg-gray-200  rounded-sm p-2 min-w-[50px] max-h-[40px] ">
              <div className="card flex justify-content-center wordspage">
                <ReusableSidebar
                  visible={visible}
                  onHide={onHide}
                  position="left"
                  filterItems={filterItems}
                  activeFilter={activeFilter}
                  handleFilterChange={handleFilterChange}
                />

                <Button
                  className="w-full min-w-[30px] p-button-text-only"
                  icon={"pi pi-filter-fill"}
                  onClick={() => setVisible(true)}

                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4   basis-9/12    ">
            <Heros heading={"Words & Words"} className="py-5 2xl:py-10" />
            <Searchbar />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 place-content-center">
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
    </div>
  )
}

export default page