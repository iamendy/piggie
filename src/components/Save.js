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

const Save = ({ record, isLoading }) => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  //Get Token Balance
  const { data: balance, isLoading: isGettingBalance } = useContractRead({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "balanceOf",
    args: [address],
  });

  record && console.log(record);

  const {
    config: approveConfig,
    isFetching,
    isError,
    error,
  } = usePrepareContractWrite({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "approve",
    args: [config.contract.address, ethers.utils.parseEther("50")],
    //enabled: false,
  });
  const {
    data: approveData,
    write: approve,
    isSuccess: isApproved,
    isLoading: isWriting,
  } = useContractWrite(approveConfig);
  const { isSuccess: isApprovedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: approveData?.hash,
    });

  useEffect(() => {
    if (isApprovedSuccess == true) {
      createPiggy();
    }
  }, [isApprovedSuccess]);

  const {
    config: createConfig,
    isFetching: isFetchingP,
    isError: isErrorP,
    error: errorP,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "createPiggy",
    args: [ethers.utils.parseEther("50"), parseInt(60)],
    //enabled: false,
  });

  const {
    write: createPiggy,
    isLoading: isCreatingPiggy,
    isSuccess: isCreated,
  } = useContractWrite(createConfig);

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">Savings (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">
              {isLoading ? (
                <p> Loading</p>
              ) : record && record.length > 0 ? (
                ethers.utils.formatEther(record?.balance)
              ) : (
                "0.00"
              )}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm ml-auto">
              Balance (PTK)
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              {isGettingBalance ? (
                <p> Loading</p>
              ) : balance && balance > 0 ? (
                ethers.utils.formatEther(balance)
              ) : (
                "0.00"
              )}
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
              disabled={isLoadingTx || isWriting}
            />
          </div>

          <div className="flex flex-col border-gray border px-4 py-2 rounded-lg">
            <span className="text-gray">Duration</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="5 days"
              type="text"
              disabled={isLoadingTx || isWriting}
            />
          </div>

          <div>
            {isConnected ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-grayed rounded-md p-5 block w-full"
                onClick={() => approve()}
                disabled={isLoadingTx || isWriting || isCreatingPiggy}
              >
                Create Piggy
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
export default Save;
