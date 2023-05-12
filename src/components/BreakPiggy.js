import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../config";

const BreakPiggy = ({ expiresAt }) => {
  //for breaking piggie
  const {
    config: breakConfig,
    isFetching,
    isError,
    error,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "breakPiggy",
  });
  const {
    data: breakData,
    write: breakNow,
    isSuccess: isBroken,
    isLoading: isBreaking,
  } = useContractWrite(breakConfig);
  const { isSuccess: brokenSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: breakData?.hash,
    });

  return (
    <div className="">
      <span className="text-xs text-red-300">
        *You can only break piggy after countdown
      </span>
      <button
        className={`${
          parseInt(Date.now() / 1000) >= parseInt(expiresAt)
            ? "bg-blue-600 visible"
            : "bg-grayed invisible"
        }  rounded-md p-5 hover:bg-blue-700 active:bg-blue-600 block w-full disabled:bg-grayed`}
        onClick={() => breakNow?.()}
        disabled={isBreaking || isLoadingTx}
      >
        {isBreaking ? "Breaking Piggy.. 🔨" : "Break Piggy 🔨"}
      </button>
    </div>
  );
};
export default BreakPiggy;
