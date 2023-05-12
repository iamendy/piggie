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
        You can only break piggy after countdown
      </span>
      <button
        className={`${
          parseInt(Date.now() / 1000) >= parseInt(expiresAt)
            ? "bg-blue-600"
            : "bg-grayed"
        }  rounded-md p-5 block w-full`}
        onClick={() => breakNow?.()}
      >
        Break Piggy 🔨
      </button>
    </div>
  );
};
export default BreakPiggy;