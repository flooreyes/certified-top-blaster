'use client'

import { useCallback, useMemo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useBlaster } from './providers/blasterProvider';

function DataPoint({ title, value }: { title: string; value: string }) {
  return (
    <div className="text-centerw-full">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  const { chartData, highestPricePoint } = useBlaster();
  
  // Find the highest point
  const highestPoint = useMemo(() => {
    const maxPrice = Math.max(...chartData.map(d => d.price));
    const index = chartData.findIndex(d => d.price === maxPrice);
    return { data: chartData[index], index };
  }, [chartData]);

  // Use either hover data or highest point data
  const displayData = active && payload?.[0]?.payload ? payload[0].payload : chartData[highestPoint.index];

  if (!displayData) return null;

  const date = new Date(displayData.date);
  const datestring = `${date.toDateString()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  const price = `$${displayData.price.toFixed(2)}`;

  // Getting the width of the container
  const chartWidth = document.getElementById('chart-container')?.offsetWidth || 0;

  // Calculate position based on whether we're hovering or showing highest point
  const currentIndex = active && payload?.[0]
    ? chartData.findIndex(d => d.date === displayData.date)
    : highestPoint.index;

  const leftPosition = chartWidth * (currentIndex / (chartData.length - 1));

  return (
    <div className="flex flex-col items-center absolute bg-primary text-black rounded-lg p-2"
      style={{
        top: '-40px',
        left: `${leftPosition}px`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}>
      <p className="text-base text-textMuted whitespace-nowrap">
        {price}
      </p>
      <p className="text-xs text-textMuted whitespace-nowrap">
        {datestring}
      </p>
    </div>
  );
};

const Chart = () => {
  const {
    currentPrice,
    topPrice,
    prizePool,
    chartData,
    hoveredData,
    cursorX,
    highestPricePoint,
    activeIndex,
    countdown,
    setHoveredData,
    setCursorX,
    setActiveIndex
  } = useBlaster();

  const handleMouseMove = useCallback((e: any) => {
    if (e && e.activePayload && e.activePayload.length) {
      setHoveredData(e.activePayload[0].payload);
      setCursorX(e.activeCoordinate.x);
    }
  }, [setHoveredData, setCursorX]);

  const handleMouseLeave = useCallback(() => {
    setHoveredData(highestPricePoint);
    const chartContainer = document.getElementById('chart-container');
    if (chartContainer && highestPricePoint) {
      const containerWidth = chartContainer.offsetWidth;
      const index = chartData.findIndex(d => d.price === highestPricePoint.price);
      const xPosition = (containerWidth * (index / (chartData.length - 1)));
      setCursorX(xPosition);
    }
  }, [highestPricePoint, chartData, setCursorX, setHoveredData]);

  const chartLoading = false;
  const chartError = false;

  const prices = chartData.map((data) => data.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const padding = (maxPrice - minPrice) * 0.05;

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  function DataSection() {
    return (
      <div className="flex justify-between mb-4 p-4 rounded-lg w-full">
        <DataPoint title="Price" value={`$${currentPrice.toFixed(2)}`} />
        <DataPoint title="Top Blast Price" value={`$${topPrice.toFixed(2)}`} />
        <DataPoint title="Prize Pool" value={`$${prizePool.toFixed(2)}`} />
        <DataPoint title="Next Game In" value={formatTime(countdown)} />
      </div>
    )
  }

  return (
    <>
      <div className={`relative mb-1 h-96 w-full text-sm ${!chartError ? 'opacity-100' : 'opacity-50'}`}>
        {chartData.length > 2 && (
          <ResponsiveContainer className={`transition duration-100 ${chartLoading ? 'opacity-30' : 'opacity-100'}`}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -50, bottom: -5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <clipPath id="clipPath">
                  <rect x="0" y="0" width={cursorX || "100%"} height="100%" />
                </clipPath>
              </defs>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 1000 }}
              />
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
                strokeWidth={3}
                stroke={'#F2AD01'}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <XAxis axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                domain={[minPrice - padding, maxPrice + padding]} 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {cursorX !== null && (
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