'use client'
// @ts-nocheck
import { useState } from 'react'
import Chart from '@/components/chart'
import OrderForm from '@/components/orderForm'
import ActivityTable from '@/components/activityTable'

export default function Home() {
  const [currentPrice, setCurrentPrice] = useState(100)
  const [topPrice, setTopPrice] = useState(150)
  const [prizePool, setPrizePool] = useState(10000)
  return (
    <div className="flex w-full mx-auto overflow-hidden text-foreground">
      <div className="w-3/4 p-4 flex flex-col">
        <Chart
          currentPrice={currentPrice}
          topPrice={topPrice}
          prizePool={prizePool} />
        <ActivityTable />
      </div>
      <div className="w-1/4 p-4 ">
        <OrderForm
          currentPrice={currentPrice}
          onTrade={(amount) => {
            // Implement trade logic here
            console.log(`Trade executed: ${amount}`)
          }}
        />
      </div>
    </div>
  )
}