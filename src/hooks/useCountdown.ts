import { useEffect, useState } from "react";
import {
  COUNTDOWN_TOTAL_SECONDS,
  FormattedCountdown,
  formatCountdown,
} from "../utils/countdown";

export const useCountdown = (): FormattedCountdown => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= COUNTDOWN_TOTAL_SECONDS) return;

    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return formatCountdown(count);
};
