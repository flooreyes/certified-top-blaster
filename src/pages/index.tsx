"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Metrics } from "@/components/metrics"
import Chart from "@/components/chart"
import ActivityTable from "@/components/activityTable"
import { ScrollArea } from "@/components/ui/scroll-area"
import Transactions from "@/components/activityTable"

export default function TradingApp() {

  return (
    <div className="mx-auto p-4 rounded-lg h-full w-full bg-background  flex flex-col overflow-y-auto">
      <div className="flex-1 h-full flex flex-row">
        <div className=" max-w-lg w-full h-full flex flex-col">
          <div className=" flex flex-col border-b h-48">
          </div>
          <div className=" flex flex-col">
            <div className="text-lg font-display bg-primary text-primary-foreground p-2 rounded-t-md">{`<Activity)`}</div>
          </div>
          <Transactions />
        </div>
        <div className="w-full h-full p-4">
          <div className="w-full h-full">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  )
}

