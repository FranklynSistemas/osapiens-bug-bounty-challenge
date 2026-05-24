export interface FormattedCountdown {
  minutes: string;
  seconds: string;
  expired: boolean;
}

export const COUNTDOWN_TOTAL_SECONDS = 3600;

export const formatCountdown = (
  elapsedSeconds: number,
  totalSeconds: number = COUNTDOWN_TOTAL_SECONDS,
): FormattedCountdown => {
  const remaining = Math.max(totalSeconds - elapsedSeconds, 0);
  return {
    minutes: `${~~(remaining / 60)}`.padStart(2, "0"),
    seconds: `${remaining % 60}`.padStart(2, "0"),
    expired: remaining <= 0,
  };
};
