import {useState, useEffect} from 'react';

/**
 * Function to debounce value of useState
 * @param value - debounced value
 * @param delay - debounce timer, by default it's 1000 ms (1s)
 * @returns Debounced value
 */

function useDebounce(value: number | string, delay: number = 1000): number | string {
  const [debouncedValue, setDebouncedValue] = useState<number | string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;