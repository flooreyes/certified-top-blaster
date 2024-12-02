import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TabsComponent from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import Badge from './utils/Badge'


function OrderForm({ currentPrice, onTrade }: { currentPrice: number, onTrade: (amount: number) => void }) {
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('')
  const balance = 10000 // Mock balance

  const tradeTabs = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
  ]

  const handleTrade = () => {
    const tradeAmount = parseFloat(amount)
    if (!isNaN(tradeAmount) && tradeAmount > 0) {
      onTrade(tradeType === 'buy' ? tradeAmount : -tradeAmount)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <TabsComponent
          tabs={tradeTabs}
          activeTab={tradeType}
          onValueChange={setTradeType}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure your trading preferences here.
                </p>
              </div>
              {/* Add settings options here */}
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>Balance:</span>
            <span>${balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price:</span>
            <span>${currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Total:</span>
            <span>${(parseFloat(amount) * currentPrice || 0).toFixed(2)}</span>
          </div>
        </div>
        <Badge className="w-full mt-4 text-black text-2xl font-display flex justify-center"
          onClick={handleTrade}
        >
          {tradeType === 'buy' ? '<Buy)' : '(Sell>'}
        </Badge>
      </CardContent>
    </Card>
  )
}

export default OrderForm;