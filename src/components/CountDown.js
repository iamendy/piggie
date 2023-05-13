import { useCountdown } from "../hooks/useCountdown";

const CountDown = ({ expiresAt }) => {
  const { days, hours, minutes, seconds, isCountdownCompleted } =
    useCountdown(expiresAt);
  return (
    <>
      {isCountdownCompleted ? (
        <div className="flex flex-col justify-center">
          <span className="text-gray text-xs lg:text-sm mx-auto">
            Countdown
          </span>
          <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
            0:0:0
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <span className="text-gray text-xs lg:text-sm mx-auto">
            Countdown
          </span>
          <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
            {days}:{hours}:{minutes}:{seconds}
          </span>
        </div>
      )}
    </>
  );
};
export default CountDown;
