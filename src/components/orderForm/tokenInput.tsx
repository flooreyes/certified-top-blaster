import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  cleanNumericInputString,
} from '@/lib/utils';
import { formatUnits, parseUnits } from 'viem'

const MAX_INPUT_LENGTH = 20;

const AssetAmountInput: React.FC<{
  amount: string;
  setAmount: (amount: string) => void;
  tradeType: 'buy' | 'sell';
}> = ({
  tradeType,
}) => {
    const disabled = false
    const [fontSize, setFontSize] = useState(70);
    const [inputValue, setInputValue] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const symbolRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState<number | null>(0);

    const ticker = tradeType === 'buy' ? 'ETH' : 'BLASTR';

    const handleBlur = (e: { target: { blur: () => void; }; }) => {
      e.target.blur();
    };

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    const [isMounted, setIsMounted] = useState(false);

    const adjustFontSize = useCallback(() => {
      if (!containerRef.current || !measureRef.current || !symbolRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const padding = 20;

      let newFontSize = 70;

      while (newFontSize > 20) {
        measureRef.current.style.fontSize = `${newFontSize}px`;
        symbolRef.current.style.fontSize = `${newFontSize}px`;
        const totalWidth =
          measureRef.current.offsetWidth +
          symbolRef.current.offsetWidth +
          padding;

        if (totalWidth <= containerWidth) {
          break;
        }

        newFontSize -= 1;
      }

      setFontSize(newFontSize);
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '.' && inputValue.includes('.')) {
          e.preventDefault();
        }
      },
      [inputValue]
    );


    const handleAmountChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        // If the input is empty and the user types ".", set to "0."
        if ((newValue === '.' || newValue === '0') && inputValue === '') {
          newValue = '0.';
        } else if (inputValue === '.' && newValue === '0.') {
          // Do nothing, keep it as "0."
        } else if (newValue.match(/^0\.0+$/)) {
          // Keep inputs like "0.0", "0.00", etc.
        } else {
          newValue = cleanNumericInputString(newValue, 18);
        }

        // Prevent further input if the maximum length is reached
        if (newValue.length > MAX_INPUT_LENGTH) {
          return;
        }

        setInputValue(newValue);
        const newAmount = parseFloat(newValue);
        setAmount(newAmount || null);
      },
      [inputValue]
    );


    useEffect(() => {
      const formatAmount = (amount: number | null) => {
        if (amount === null) return '';
        const decimals = 18;
        return formatUnits(
          parseUnits(amount.toString(), decimals),
          decimals
        );
      };

      const formattedValue =
        amount !== null ? formatAmount(amount) : '';
      setInputValue(formattedValue);
    }, [amount, 18]);

    useEffect(() => {
      adjustFontSize();
    }, [inputValue, adjustFontSize]);

    useLayoutEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (isMounted) {
        adjustFontSize();
      }
    }, [isMounted, adjustFontSize]);

    // Update the input width based on the measureRef width
    useEffect(() => {
      if (measureRef.current && inputRef.current) {
        inputRef.current.style.width = `${measureRef.current.offsetWidth}px`;
      }
    }, [inputValue]);

    useEffect(() => {
      if (!isMounted) return;

      const resizeObserver = new ResizeObserver(() => {
        if (isMounted) {
          adjustFontSize();
        }
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [isMounted, adjustFontSize]);

    return (
      <div
        ref={containerRef}
        style={{
          fontSize: `${fontSize}px`,
          transition: 'font-size 0.05s ease-in-out',
        }}
        className={`mt-2 box-border flex h-20 my-1 w-full flex-row items-center  ${disabled ? 'cursor-default' : 'cursor-text'
          }`}
        onClick={handleFocus}
      >
        <div className="relative flex w-full items-center ">
          <input
            ref={inputRef}
            type="tel"
            step=".0000001"
            placeholder="0"
            autoComplete="off"
            id={`${tradeType}Amount`}
            value={inputValue}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={handleKeyDown}
            onChange={handleAmountChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              transition: 'width 0.15s ease-in-out',
              color: disabled ? 'var(--textMuted)' : 'inherit',
              WebkitTextFillColor: disabled ? 'var(--textMuted)' : 'inherit',
              opacity: 1,
            }}
            className={`!placeholder:text-textMuted flex min-w-[45px] whitespace-nowrap bg-transparent disabled:text-textMuted focus:ring-0`}
            disabled={disabled}
          />
          <span
            style={{ transition: 'width 0.15s ease-in-out' }}
            ref={measureRef}
            className={`absolute flex whitespace-nowrap opacity-0 ${inputValue ? 'text-text' : 'text-textMuted'
              }`}
          >
            {inputValue || 0}
          </span>
          <span
            ref={symbolRef}
            className="ml-2 font-light uppercase text-textMuted"
          >
            {ticker}
          </span>
        </div>
      </div>
    );
  };

export default AssetAmountInput;
