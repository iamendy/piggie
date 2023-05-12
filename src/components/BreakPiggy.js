import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../config";
import Loader from "./icons/Loader";
import { toast } from "react-hot-toast";

const BreakPiggy = ({ expiresAt }) => {
  //for breaking piggie
  const { config: breakConfig } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "breakPiggy",
  });
  const {
    data: breakData,
    write: breakNow,
    isLoading: isBreaking,
  } = useContractWrite(breakConfig);
  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: breakData?.hash,
    onSuccess: () => {
      toast.success("Savings transferred Successfully! 🍾", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  return (
    <div className="">
      <button
        className={`${
          parseInt(Date.now() / 1000) >= parseInt(expiresAt)
            ? "bg-blue-600 visible"
            : "bg-grayed invisible"
        }  rounded-md p-5 hover:bg-blue-700 active:bg-blue-600 flex items-center justify-center w-full disabled:bg-grayed`}
        onClick={() => breakNow?.()}
        disabled={isBreaking || isLoadingTx}
      >
        {isBreaking || isLoadingTx ? (
          <>
            <Loader /> <span>Breaking Piggy.. 🔨</span>
          </>
        ) : (
          "Break Piggy 🔨"
        )}
      </button>
    </div>
  );
};
export default BreakPiggy;
