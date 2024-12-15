import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Slippage from './slippage'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import Expiry from './expiry'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'

const TradeSettings = () => {

  const [slippage, setSlippage] = useState<number | null>(null);

  const handleSLippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlippage(parseFloat(e.target.value));
  }

  const [timeToExpiry, setTimeToExpiry] = useState(3600);

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) > 2) {
      setTimeToExpiry(Math.floor(parseFloat(e.target.value) * 60 * 1000));
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Trade Settings</h4>

          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center space-x-2">
              <Label className='w-36' htmlFor="width">Max Slippage</Label>
              <div className='relative flex-1'>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="h-8 text-white"
                  value={slippage || ''}
                  onChange={handleSLippageChange}
                />
                <Label className='absolute right-4 top-1/2 -translate-y-1/2 text-secondary'>%</Label>
              </div>
              <Button variant={!slippage ? 'default' : 'ghost'} onClick={() => setSlippage(null)} size="sm" className='h-8'>Auto</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Label className='w-36' htmlFor="maxWidth">Trade Deadline</Label>
              <div className='relative flex-1'>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="h-8"
                  value={timeToExpiry || ''}
                  onChange={handleExpiryChange}
                />
                <Label className='absolute right-4 top-1/2 -translate-y-1/2 text-secondary'>Minutes</Label>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default TradeSettings;


