import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import config from "../config";
import { useState } from "react";
import CountDown from "../components/CountDown";
import BreakPiggy from "../components/BreakPiggy";
import useDebounce from "../hooks/useDebounce";
import Loader from "./icons/Loader";
import { toast } from "react-hot-toast";

const CountDownSection = ({ record, balance }) => {
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState("");
  const debouncedAmount = useDebounce(amount, 500);

  //for approving update
  const { config: approveConfig } = usePrepareContractWrite({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "approve",
    args: [
      config.contract.address,
      ethers.utils.parseEther(debouncedAmount || "0"),
    ],
  });
  const {
    data: approveData,
    write: approve,
    isLoading: isApproving,
  } = useContractWrite(approveConfig);
  //approveData && console.log(approveData);
  const { isLoading: isLoadingApproveTx } = useWaitForTransaction({
    confirmations: 2,
    hash: approveData?.hash,
    onSuccess: () => {
      refetch?.();
      update?.();
    },
  });

  //for updating piggie
  const { config: updateConfig, refetch } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "updateBalance",
    overrides: {
      from: address,
    },
    args: [ethers.utils.parseEther(debouncedAmount || "0")],
  });
  const {
    data: updateData,
    write: update,
    isLoading: isUpdating,
  } = useContractWrite(updateConfig);
  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: updateData?.hash,
    confirmations: 1,
    onError(e) {
      toast.error(e.reason, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
    onSuccess: () => {
      setAmount("");
      toast.success("Updated Successfully 🔐", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const handleUpdate = () => {
    if (!amount || Number(amount) > ethers.utils.formatEther(balance)) {
      return toast.error("insufficient token balance", {
        id: "error",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    approve?.();
  };

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">Saved (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">
              {record?.balance > 0
                ? ethers.utils.formatEther(record?.balance)
                : "0.0"}
            </span>
          </div>

          <CountDown expiresAt={parseInt(record?.expiresAt)} />

          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm ml-auto">
              Balance (PTK)
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              {balance > 0 ? ethers.utils.formatEther(balance) : "0.0"}
            </span>
          </div>
        </div>

        <div className="form mt-9 space-y-16">
          <div className="flex flex-col border-gray border px-4 py-4 rounded-lg">
            <span className="text-gray">Update Savings</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="200"
              type="text"
              disabled={isUpdating || isLoadingTx || isLoadingApproveTx}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-md p-3 mt-5 w-full disabled:bg-grayed flex items-center justify-center"
              onClick={() => handleUpdate()}
              disabled={
                isUpdating ||
                isLoadingTx ||
                isLoadingApproveTx ||
                isApproving ||
                !amount
              }
            >
              {isUpdating ||
              isLoadingTx ||
              isLoadingApproveTx ||
              isApproving ? (
                <>
                  <Loader />
                  <span>
                    {isApproving || isLoadingApproveTx
                      ? "Approving"
                      : "Updating"}
                  </span>
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>

          <BreakPiggy expiresAt={record?.expiresAt} />
        </div>
      </div>
    </div>
  );
};
export default CountDownSection;
