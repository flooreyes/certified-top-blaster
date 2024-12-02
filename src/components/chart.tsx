import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

function DataPoint({ title, value }: { title: string; value: string }) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}



// Custom Tooltip Component
const CustomTooltip = ({ active, payload, coordinate }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.date);
    const datestring = `${date.toDateString()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

    // Getting the width of the container to calculate boundaries
    const chartWidth = document.getElementById('chart-container')?.offsetWidth || 0;

    // Adjusting the tooltip to display as a single line, centered horizontally at the top of the chart
    let leftPosition = coordinate ? coordinate.x : 0;

    // Apply boundary constraints for left and right sides
    if (leftPosition < 95) {
      leftPosition = 95; // Prevent going off the left edge
    } else if (leftPosition > chartWidth - 85) {
      leftPosition = chartWidth - 85; // Prevent going off the right edge
    }

    return (
      <p
        className="absolute text-base text-textMuted whitespace-nowrap"
        style={{
          top: '-10px', // Position it at the top of the chart
          left: `${leftPosition}px`, // Dynamically adjust based on cursor position
          transform: 'translateX(-50%)', // Center horizontally
        }}
      >
        {datestring}
      </p>
    );
  }

  return null;
};

const chartData = [
  { date: '2023-01-01', price: 1900 },
  { date: '2023-01-02', price: 2110 },
  { date: '2023-01-03', price: 1890 },
  { date: '2023-01-04', price: 2348 },
  { date: '2023-01-05', price: 2154 },
  { date: '2023-01-06', price: 2440 },
  { date: '2023-01-07', price: 2570 },
  { date: '2023-01-08', price: 2307 },
  { date: '2023-01-09', price: 2238 },
  { date: '2023-01-10', price: 2156 },
  { date: '2023-01-11', price: 1853 },
];

const Chart = () => {
  const [wethData, setWethData] = useState<WethData>({
    price: 0,
    change24h: 0,
  });
  const [hoveredData, setHoveredData] = useState(null);
  const [initialPercentageChange, setInitialPercentageChange] = useState<number>(0);
  const [initialCurrentPrice, setInitialCurrentPrice] = useState<number>(0);
  const [hoveredCurrentPrice, setHoveredCurrentPrice] = useState<number | null>(null);
  const chartLoading = false;
  const chartError = false;

  const prices = chartData.map((data) => data.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const padding = (maxPrice - minPrice) * 0.05;



  const getPreviousPrice = (priceHistory) => {
    if (priceHistory.length === 0) return null;
    return priceHistory[0].price;
  };

  const previousPrice = getPreviousPrice(chartData);

  // Dynamic percentage change based on hovered data or the latest price
  const dynamicPercentageChange = useMemo(() => {
    if (hoveredData && previousPrice) {
      return ((hoveredData.price - previousPrice) / previousPrice) * 100;
    }
    return hoveredCurrentPrice && previousPrice
      ? ((hoveredCurrentPrice - previousPrice) / previousPrice) * 100
      : 0;
  }, [hoveredData, hoveredCurrentPrice, previousPrice]);

  // Track hovered price separately
  useEffect(() => {
    if (hoveredData) {
      setHoveredCurrentPrice(hoveredData.price);
    }
  }, [hoveredData]);

  const [cursorX, setCursorX] = useState(null);
  // const chartRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (e && e.activePayload && e.activePayload.length) {
      setHoveredData(e.activePayload[0].payload);
      setCursorX(e.activeCoordinate.x);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCurrentPrice(null);
    setCursorX(null);
  }, []);

  const currentPrice = 100;
  const topPrice = 150;
  const prizePool = 10000;

  function DataSection({ currentPrice, topPrice, prizePool }: { currentPrice: number, topPrice: number, prizePool: number }) {
    const [countdown, setCountdown] = useState(3600) // 1 hour in seconds
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 3600))
      }, 1000)
  
      return () => clearInterval(timer)
    }, [])
  
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
  
    return (
      <div className="flex justify-between mb-4 bg-secondary p-4 rounded-lg">
        <DataPoint title="Next Game In" value={formatTime(countdown)} />
        <DataPoint title="Top Price" value={`$${topPrice.toFixed(2)}`} />
        <DataPoint title="Prize Pool" value={`$${prizePool.toFixed(2)}`} />
      </div>
    )
  }


  return (
    <>
      <div id="chart-container" className="relative h-20 @container mb-4">
        <div className="left-0 mt-6 flex h-16 flex-row items-center space-x-4 pl-4 xs:mt-0">
          <div className="flex flex-col space-y-1">
            {hoveredCurrentPrice !== null ? (
              <div className="flex h-6 flex-row items-baseline space-x-3 lg:h-8 ">
                <p className="text-4xl font-light uppercase text-text lg:text-xl">
                  <span>
                    {`$${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: hoveredCurrentPrice < 1 ? 8 : 2,
                    }).format(hoveredCurrentPrice)}`}
                  </span>
                </p>
                <span
                  className={`text-lg font-light uppercase lg:text-lg ${dynamicPercentageChange < 0 ? 'text-textError' : 'text-textSuccess'
                    }`}
                >
                  {dynamicPercentageChange.toFixed(2)}%
                </span>
              </div>
            ) : (
              <div className=" flex h-6 flex-row items-baseline space-x-3 lg:h-8 ">
                <p className="text-lg font-light uppercase text-text lg:text-xl">
                  <span>
                    {`$${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: initialCurrentPrice < 1 ? 8 : 2,
                    }).format(initialCurrentPrice)}`}
                  </span>
                </p>
                <span
                  className={`text-lg font-light uppercase lg:text-lg ${initialPercentageChange < 0 ? 'text-textError' : 'text-textSuccess'
                    }`}
                >
                  {initialPercentageChange.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
        <DataSection currentPrice={currentPrice} topPrice={topPrice} prizePool={prizePool} />
      </div>
      <div
        className={`relative mb-1 h-96 w-full text-sm ${!chartError ? 'opacity-100' : 'opacity-50'}`}
      >
        {chartData.length > 2 && (
          <ResponsiveContainer className={`transition duration-100 ${chartLoading ? 'opacity-30' : 'opacity-100'}`}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -50, bottom: -5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={'#F2AD01'} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={'#F2AD01'} stopOpacity={0} />
                </linearGradient>
                <clipPath id="clipPath">
                  <rect x="0" y="0" width={cursorX || "100%"} height="100%" />
                </clipPath>
              </defs>
              <YAxis axisLine={false} tickLine={false} tick={false} domain={[minPrice - padding, maxPrice + padding]} />
              {!chartError && <Tooltip cursor={false} content={<CustomTooltip />} />}
              <Area
                type="monotone"
                dataKey="price"
                stroke={'#F2AD01'}
                fillOpacity={1}
                fill="url(#colorUv)"
                clipPath="url(#clipPath)"
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={'#F2AD01'}
                fillOpacity={0.3}
                fill="url(#colorUv)"
              />
              {/* <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                dy={-10}
                dx={0}
                tickFormatter={formatXAxis}
                interval={'preserveStart'}
                tickCount={getTickCount()}
                type='number'
                domain={['dataMin', 'dataMax']}
              /> */}
            </AreaChart>
          </ResponsiveContainer>
        )}
        {cursorX && (
          <svg
            style={{
              position: 'absolute',
              top: 15,
              left: 0,
              width: '100%',
              height: '95%',
              pointerEvents: 'none',
            }}
          >
            <line
              x1={cursorX}
              y1="0"
              x2={cursorX}
              y2="100%"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default Chart;