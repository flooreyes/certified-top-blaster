import { useState } from "react";

function Expiry() {
  const [timeToExpiry, setTimeToExpiry] = useState(3600);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) > 2) {
      setTimeToExpiry(Math.floor(parseFloat(e.target.value) * 60 * 1000));
    }
  }

  return (
    <div className=''>
      <div className="flex flex-row justify-between">
        <div className='flex flex-col space-y-2 justify-start'>
          <div className='flex flex-col  '>
            <p className="whitespace-nowrap text-sm font-medium ">
              Time to Expiry:
            </p>
            <div className="flex h-10 flex-row items-center">
              <input
                type="number"
                placeholder={'0'}
                className="px-2 bg-transparent text-2xl text-right font-medium text-text placeholder:text-text border rounded w-24"
                value={Math.floor(timeToExpiry! / 60 / 1000)}
                onChange={handleInputChange}
              />
              <p className='text-sm ml-2'>Minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expiry