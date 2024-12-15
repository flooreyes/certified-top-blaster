"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Metrics } from "@/components/metrics"
import Chart from "@/components/chart"
import ResponsiveScrollableTransactions from "@/components/activityTable"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import OrderForm from "@/components/orderForm/orderForm"

export default function TradingApp() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className=" mx-auto p-4 rounded-lg  h-full w-full bg-background">
      <div className="mb-6">
        <Metrics />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {!isMobile && (
          <div className="lg:col-span-1 max-w-[300px]">
            <ResponsiveScrollableTransactions />
          </div>
        )}
        <div className="md:col-span-2 lg:col-span-1">
          <Chart />
        </div>
        {!isMobile && (
          <div className="lg:col-span-1">
            <OrderForm />
          </div>
        )}
      </div>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex justify-between">
          <ResponsiveScrollableTransactions />
          <Drawer open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
            <DrawerTrigger asChild>
              <Button>Place Order</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Place Order</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <OrderForm />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  )
}

