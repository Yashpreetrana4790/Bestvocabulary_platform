import Image from "next/image"


const TokenCredit = () => {


  return (
    <>

      {/* <span className="text-sm font-semibold text-emerald-500">
        50
      </span> */}
      <div className="border-r border-gray-400" >

        <Image src="/token.png" width={100} height={100} alt="token img" className="w-10 h-10" />
      </div>
    </>
  )
}

export default TokenCredit