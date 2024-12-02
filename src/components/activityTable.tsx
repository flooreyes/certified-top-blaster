import { useState } from 'react'
import TabsComponent from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


function ActivityTable() {
  const [activeTab, setActiveTab] = useState('activity')

  const tables = [
    { value: 'activity', label: 'Activity' },
    { value: 'history', label: 'History' },
  ]

  const activityData = [
    { type: 'Buy', amount: 100, price: 120, time: '10:30 AM' },
    { type: 'Sell', amount: 50, price: 125, time: '11:15 AM' },
    { type: 'Top Price', price: 130, time: '12:00 PM' },
    { type: 'Buy', amount: 75, price: 128, time: '1:45 PM' },
  ]

  const gamesData = [
    { id: 1, startTime: '9:00 AM', endTime: '10:00 AM', topPrice: 140, prizePool: 5000 },
    { id: 2, startTime: '10:00 AM', endTime: '11:00 AM', topPrice: 135, prizePool: 4800 },
    { id: 3, startTime: '11:00 AM', endTime: '12:00 PM', topPrice: 150, prizePool: 5500 },
  ]

  return (
    <>
      <TabsComponent
        tabs={tables}
        activeTab={activeTab}
        onValueChange={setActiveTab}
      />
      <Table>
        <TableHeader>
          {activeTab === 'activity' ? (
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          ) : (
            <TableRow>
              <TableHead>Game ID</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Top Price</TableHead>
              <TableHead>Prize Pool</TableHead>
            </TableRow>
          )
          }
        </TableHeader>


        <TableBody>
          {activeTab === 'activity' ? (
            <>
              {activityData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.amount || '-'}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))}</>
          ) : (
            <>
              {gamesData.map((game) => (
                <TableRow className="bg-secondary rounded-lg border" key={game.id}>
                  <TableCell>{game.id}</TableCell>
                  <TableCell>{game.startTime}</TableCell>
                  <TableCell>{game.endTime}</TableCell>
                  <TableCell>${game.topPrice}</TableCell>
                  <TableCell>${game.prizePool}</TableCell>
                </TableRow>
              ))}</>
          )
          }
        </TableBody>
      </Table>
    </>
  )
}


export default ActivityTable;