import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import config from "../config";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useDebounce from "../hooks/useDebounce";
import Loader from "./icons/Loader";
import { toast } from "react-hot-toast";

const NewPiggieSection = ({ record, balance }) => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const debouncedAmount = useDebounce(amount, 500);
  const debouncedDuration = useDebounce(duration, 500);

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
    isLoading: isWriting,
    isFetching,
  } = useContractWrite(approveConfig);
  console.log(approveData);
  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash: approveData?.hash,
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
      console.log("here");
      refetch?.();
      createPiggy?.();
    },
  });

  const { config: createConfig, refetch } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "createPiggy",
    args: [
      ethers.utils.parseEther(debouncedAmount || "0"),
      parseInt(debouncedDuration),
    ],
  });

  const {
    data: createdData,
    write: createPiggy,
    isLoading: isCreatingPiggy,
  } = useContractWrite({
    ...createConfig,
  });
  const { isFetching: isCreationTx } = useWaitForTransaction({
    hash: createdData?.hash,
    onSuccess: () => {
      toast.success("Added Successful 🔐", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });

  const handleApprove = () => {
    if (amount && duration) {
      approve?.();
    }
  };

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">Savings (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">
              {record.balance > 0
                ? ethers.utils.formatEther(record?.balance)
                : "0.0"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm ml-auto">
              Balance (PTK)
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              {balance > 0 ? ethers.utils.formatEther(balance) : "0.0"}
            </span>
          </div>
        </div>

        <div className="form mt-9 space-y-9">
          <div className="flex flex-col border-gray border px-4 py-2 rounded-lg">
            <span className="text-gray">Amount</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="200"
              type="text"
              disabled={
                isLoadingTx || isWriting || !isConnected || isCreationTx
              }
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col border-gray border px-4 py-2 rounded-lg">
            <span className="text-gray">Duration</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="5 days"
              type="text"
              disabled={
                isLoadingTx || isWriting || !isConnected || isCreationTx
              }
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            {isConnected ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-grayed rounded-md p-5 flex justify-center items-center w-full"
                onClick={() => handleApprove()}
                disabled={
                  isLoadingTx || isWriting || isCreatingPiggy || isCreationTx
                }
              >
                {isLoadingTx || isWriting || isCreatingPiggy || isCreationTx ? (
                  <>
                    <Loader />
                    <span>
                      {isCreatingPiggy || isCreationTx
                        ? "Creating Piggie"
                        : "Approving"}
                    </span>
                  </>
                ) : (
                  "Create Piggy"
                )}
              </button>
            ) : (
              openConnectModal && (
                <button
                  className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-md p-5 block w-full"
                  onClick={openConnectModal}
                >
                  Connect Wallet
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewPiggieSection;
