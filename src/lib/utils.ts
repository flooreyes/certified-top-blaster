import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
  Remove numeric characters we don't want our forms to accept:
  - leading 0
  - negative sign
  - exponent character ('e')
  If decimals are provided, this will also remove trailing digits in excess of the allowed decimals
*/
export const cleanNumericInputString = (input: string, decimals?: null | number): string => {
  if (input === '') {
      return input;
  }
  const cleanedInput = input
      .replaceAll(/[^0-9.]/g, '')
      .replaceAll(/^0+/g, '0')
      .replaceAll(/^0(?=[1-9])/g, '')
      .replaceAll(/^\./g, '0.')

  if (decimals) {
      const [beforeDecimals, afterDecimals = ''] = cleanedInput.split('.');
      const afterDecimalCount = afterDecimals.length;
      const excessDigits = afterDecimalCount - decimals;
      if (excessDigits > 0) {
          return [
              beforeDecimals,
              afterDecimals.substring(0, afterDecimals.length - excessDigits)
          ].join('.')
      }
  }
  return cleanedInput;
}