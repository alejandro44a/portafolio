import { useEffect, useState } from 'react';
import { profile } from '@/data';

/** Live local time in Monterrey, e.g. "14:52". */
export function useClock() {
  const fmt = () =>
    new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: profile.timezone });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;
