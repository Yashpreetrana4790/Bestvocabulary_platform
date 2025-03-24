import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const ReAccCard = ({ heading, list }) => {
  return (
    <div>
      <Accordion type="single" collapsible  >
        <AccordionItem value="item-1" className='border-none my-1 bg-white dark:bg-gray-900 '>
          <AccordionTrigger className=" flex-grow w-full text-xl">{heading}</AccordionTrigger>
          <AccordionContent className=" p-2 text-base border-t dark:border-white border-gray-900">
            {list?.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p>{index + 1}.</p>
                  {item}
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ReAccCard