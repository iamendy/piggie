import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = targetDate;
  const [isCountdownCompleted, setIsCountdownCompleted] = useState(false);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime() / 1000
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(Math.floor(countDownDate - new Date().getTime() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const minute = 60;
  const hour = 60 * 60;
  const day = 60 * 60 * 24;

  // calculate time left
  const days = Math.floor(countDown / day);
  const hours = Math.floor((countDown - days * day) / hour);
  const minutes = Math.floor((countDown - days * day - hours * hour) / minute);
  const seconds = Math.floor(
    countDown - days * day - hours * hour - minutes * minute
  );

  useEffect(() => {
    checkCompleted();
  }, [countDown]);

  const checkCompleted = () => {
    if (days < 0) {
      setIsCountdownCompleted(true);
    } else {
      setIsCountdownCompleted(false);
    }
  };

  return { days, hours, minutes, seconds, isCountdownCompleted };
};

export { useCountdown };
