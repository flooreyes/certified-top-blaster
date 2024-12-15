import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  { title: "Total Balance", value: "$10,231.84" },
  { title: "24h Change", value: "+5.25%" },
  { title: "Open Positions", value: "8" },
  { title: "P/L", value: "$1,231.84" },
]

export function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

