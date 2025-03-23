
import { fetchLearn } from "@/services/learn"
import React from "react"




const Learn = async () => {

  const learn = await fetchLearn()

if (learn){
  console.log(learn, "lklk")
}


  return (

    <div className="container mx-auto">



    </div>

  )
}

export default Learn
