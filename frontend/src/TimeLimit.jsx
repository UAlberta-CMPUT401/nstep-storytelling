import { useEffect, useState, useRef } from 'react';

export default function useTimeout(callback, delay) {
  const stableCallback = useRef(callback);

  useEffect(() => {
    stableCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => stableCallback.current();

    if (typeof delay !== 'number') return;

    const t = setTimeout(tick, delay);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(t);
  }, [delay]);
}
