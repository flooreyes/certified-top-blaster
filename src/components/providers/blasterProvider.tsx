'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChartData {
  date: string;
  price: number;
}

interface BlasterContextType {
  // Chart state
  currentPrice: number;
  topPrice: number;
  prizePool: number;
  chartData: ChartData[];
  hoveredData: any;
  cursorX: number | null;
  highestPricePoint: any;
  isTooltipActive: boolean;
  activeIndex: number | null;
  countdown: number;
  
  // OrderForm state
  tradeType: 'buy' | 'sell';
  amount: string;
  balance: number;
  slippage: number | null;
  timeToExpiry: number;

  // Methods
  setCurrentPrice: (price: number) => void;
  setTopPrice: (price: number) => void;
  setPrizePool: (amount: number) => void;
  setHoveredData: (data: any) => void;
  setCursorX: (x: number | null) => void;
  setActiveIndex: (index: number | null) => void;
  setTradeType: (type: 'buy' | 'sell') => void;
  setAmount: (amount: string) => void;
  setSlippage: (slippage: number | null) => void;
  setTimeToExpiry: (time: number) => void;
  handleTrade: (amount: number) => void;
}

const BlasterContext = createContext<BlasterContextType | undefined>(undefined);

export function BlasterProvider({ children }: { children: React.ReactNode }) {
  // Chart state
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [topPrice, setTopPrice] = useState<number>(150);
  const [prizePool, setPrizePool] = useState<number>(10000);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);
  const [highestPricePoint, setHighestPricePoint] = useState<any>(null);
  const [isTooltipActive, setIsTooltipActive] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(3600);

  // OrderForm state
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<number>(10000);
  const [slippage, setSlippage] = useState<number | null>(null);
  const [timeToExpiry, setTimeToExpiry] = useState<number>(3600);

  // Sample chart data
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

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Find highest price point on mount
  useEffect(() => {
    const maxPrice = Math.max(...chartData.map(d => d.price));
    const highestPoint = chartData.find(d => d.price === maxPrice);
    setHighestPricePoint(highestPoint);
    setHoveredData(highestPoint);
  }, []);

  const handleTrade = (tradeAmount: number) => {
    console.log(`Trade executed: ${tradeAmount}`);
    // Implement trade logic here
  };

  const value = {
    currentPrice,
    topPrice,
    prizePool,
    chartData,
    hoveredData,
    cursorX,
    highestPricePoint,
    isTooltipActive,
    activeIndex,
    countdown,
    tradeType,
    amount,
    balance,
    slippage,
    timeToExpiry,
    setCurrentPrice,
    setTopPrice,
    setPrizePool,
    setHoveredData,
    setCursorX,
    setActiveIndex,
    setTradeType,
    setAmount,
    setSlippage,
    setTimeToExpiry,
    handleTrade,
  };

  return (
    <BlasterContext.Provider value={value}>
      {children}
    </BlasterContext.Provider>
  );
}

export function useBlaster() {
  const context = useContext(BlasterContext);
  if (context === undefined) {
    throw new Error('useBlaster must be used within a BlasterProvider');
  }
  return context;
}
