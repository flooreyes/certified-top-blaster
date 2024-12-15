import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TabsComponent from '@/components/ui/tabs'
import { useState } from 'react'
import Badge from '../utils/Badge'
import AssetAmountInput from './tokenInput'
import TradeSettings from './tradeSettings'
import { useBlaster } from '@/components/providers/blasterProvider';

function OrderForm() {
  const {
    currentPrice,
    tradeType,
    amount,
    balance,
    setTradeType,
    setAmount,
    handleTrade
  } = useBlaster();

  const tradeTabs = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
  ]

  const handleTradeSubmit = () => {
    const tradeAmount = parseFloat(amount)
    if (!isNaN(tradeAmount) && tradeAmount > 0) {
      handleTrade(tradeType === 'buy' ? tradeAmount : -tradeAmount)
    }
  }

  return (
    <Card className="h-[30rem] flex flex-col bg-transparent border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <TabsComponent
          tabs={tradeTabs}
          activeTab={tradeType}
          onValueChange={(value) => setTradeType(value as "buy" | "sell")}
        />
        <TradeSettings />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <AssetAmountInput amount={amount} setAmount={setAmount} tradeType={tradeType as "buy" | "sell"} />
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
          onClick={handleTradeSubmit}
        >
          {tradeType === 'buy' ? '<Buy)' : '(Sell>'}
        </Badge>
      </CardContent>
    </Card>
  )
}

export default OrderForm;