'use client'
import Button from "@/components/Button"
import Heros from "@/components/Header/Heros"
import FeaturedCardGroup from "@/components/HomeStatic/FeaturedCardGroup"
import Searchbar from "@/components/searchbar/Searchbar"
import { filterItemsGrouped } from "@/constants"
import { transformToGroupedStructure } from "@/utils/transformationArr"
import { useEffect, useState } from "react";


export default function Page() {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');



  const handleSearch = (value) => {
    setSearchValue(value);
    // Perform search logic here based on the search value
    console.log(`Performing search for '${value}'`);
  };

  const setDropdownValuefn = (value) => {
    setDropdownValue(value);
    // Handle dropdown value change if needed
    console.log(`Dropdown value selected: '${value}'`);
  };





  return (
    <>
      <div className="flex min-h-[100dvh] flex-col">
        <Heros heading="Elevate Your English Vocabulary"
          para=" Unlock the power of words with our comprehensive vocabulary learning platform.
        Discover new words, practice
          daily, and master the English language."
          buttoncontent={<Button label="Words Treasure" iconleft="pi pi-sparkles" iconright={"pi pi-arrow-up-right"} />} />
        <Searchbar
          value={searchValue}
          onSearch={handleSearch}
          options={filterItemsGrouped}
          selectOption={setDropdownValuefn}
          optionsvalue={dropdownValue}

        />
        <FeaturedCardGroup />
      </div>
    </>

  )
}



