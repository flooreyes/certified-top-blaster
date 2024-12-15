
import { useState } from 'react';

function Slippage() {
  const [slippage, setSlippage] = useState(0.05);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlippage(parseFloat(e.target.value));
  }

  return (
    <div className=''>
      <div className="flex flex-row justify-between">
        <div className='flex flex-col space-y-2 justify-start'>  
          <div className='flex flex-col'>
              <p className="whitespace-nowrap text-sm font-medium mb-2">
                Slippage Tolerance:
              </p>
              <div className="flex h-10 flex-row items-center">
                <input
                  type="number"
                  placeholder={'0'}
                  className="px-2 bg-transparent text-2xl text-right font-medium text-text placeholder:text-text border rounded w-24 "
                  value={slippage}
                  onChange={handleInputChange}
                  // onBlur={handleSubmitChange} // Update on blur
                  // onKeyPress={(e) => e.key === 'Enter' && handleSubmitChange()} // Update on Enter key press
                />
                <p className='text-2xl ml-2'>%</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slippage