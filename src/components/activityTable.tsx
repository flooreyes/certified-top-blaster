"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Card } from "./ui/card"

type Transaction = {
  timestamp: number
  orderType: "Buy" | "Sell"
  address: string
  amount: bigint // Changed to bigint for wei values
  topBlast: boolean
}

const transactions: Transaction[] = [
  { timestamp: 1709558400000, orderType: "Buy", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", amount: BigInt("1000000000000000000000"), topBlast: true },
  { timestamp: 1709557500000, orderType: "Sell", address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", amount: BigInt("1500000000000000000000"), topBlast: false },
  { timestamp: 1709556600000, orderType: "Buy", address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0", amount: BigInt("2000000000000000000000"), topBlast: false },
  { timestamp: 1709555700000, orderType: "Sell", address: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec", amount: BigInt("3000000000000000000000"), topBlast: false },
  { timestamp: 1709554800000, orderType: "Buy", address: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788", amount: BigInt("2500000000000000000000"), topBlast: false },
  { timestamp: 1709553900000, orderType: "Sell", address: "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", amount: BigInt("1800000000000000000000"), topBlast: false },
  { timestamp: 1709553000000, orderType: "Buy", address: "0x976EA74026E726554dB657fA54763abd0C3a0aa9", amount: BigInt("3500000000000000000000"), topBlast: false },
  { timestamp: 1709552100000, orderType: "Sell", address: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", amount: BigInt("4000000000000000000000"), topBlast: false },
  { timestamp: 1709551200000, orderType: "Buy", address: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f", amount: BigInt("1200000000000000000000"), topBlast: false },
  { timestamp: 1709550300000, orderType: "Sell", address: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", amount: BigInt("2200000000000000000000"), topBlast: false }
]

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e18).toFixed(2)
}

function TransactionRow(transaction: Transaction) {
  return (
    <div
      className={`flex flex-row justify-between p-2 ${transaction.topBlast
          ? "bg-gradient-to-r from-yellow-500 to-orange-500" // Special styling for topBlast
          : "bg-black"
        } rounded`}
      key={transaction.timestamp}
      style={{
        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%)',
        borderRadius: '4px',
        ...(transaction.topBlast && {
          border: '1px solid #F2AD01',
          boxShadow: '0 0 10px rgba(242, 173, 1, 0.3)'
        })
      }}
    >
      <div className="w-8">
        {transaction.orderType === "Buy" ? (
          transaction.topBlast ? (
            <div className="h-4 text-black text-lg whitespace-nowrap font-display">(TOP)</div>
          ) : (
            <svg className="w-8 h-auto" viewBox="0 0 308 202" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M279.484 29.501L280.445 24.9166H60.112L52.612 59.7499H183.785L69.612 130.417L59.7787 177.25H108.562L112.061 160.251L233.279 78.5719L212.254 177.629H248.112L279.553 29.501H279.484ZM43.112 0.75L0.445312 201.417H265.112L307.778 0.75H43.112Z" fill="#F2AD01" />
            </svg>
          )
        ) : (
          <svg className="w-8 h-auto" width="308" height="202" viewBox="0 0 308 202" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5631 172.666L27.6015 177.25L247.935 177.25L255.435 142.417L124.262 142.417L238.435 71.7504L248.268 24.9173H199.485L195.986 41.9159L74.7677 123.595L95.793 24.5381H59.9354L28.4939 172.666H28.5631ZM264.935 201.417L307.602 0.750351L42.9345 0.750351L0.268494 201.417L264.935 201.417Z" fill="#F23101" />
          </svg>
        )}
      </div>
      <div className={`text-right ${transaction.topBlast ? "text-black font-bold" : ""}`}>
        {formatAddress(transaction.address)}
      </div>
      <div className={`text-right ${transaction.topBlast ? "text-black font-bold" : ""}`}>
        {formatAmount(transaction.amount)}
      </div>
    </div>
  )
}
function TransactionsTable() {
  const sortedTransactions = [...transactions].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <ScrollArea className="h-[300px] w-full rounded-md">
      <div className="flex flex-col space-y-px p-px bg-primary outline-1 outline-primary rounded-md">
        {sortedTransactions.map((transaction) => (
          <TransactionRow {...transaction} key={transaction.timestamp} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default function ResponsiveScrollableTransactions() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close drawer when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full">View Transactions</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Transaction History</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <TransactionsTable />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <TransactionsTable />
  )
}

