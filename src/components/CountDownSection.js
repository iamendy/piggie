import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { ethers } from "ethers";
import config from "../config";
import { useEffect } from "react";
import CountDown from "../components/CountDown";
import BreakPiggy from "../components/BreakPiggy";

const CountDownSection = () => {
  const { isConnected, address } = useAccount();

  //Get Token Balance
  const { data: balance, isLoading: isGettingBalance } = useContractRead({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "balanceOf",
    args: [address],
  });

  //Get Savings Balance
  const { data: record, isLoading: isGettingRecord } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    //from: address,
    overrides: {
      from: address,
    },
    functionName: "getRecord",
  });

  //for approving update
  const {
    config: approveConfig,
    isApproveFetching,
    isApproveError,
    approveError,
  } = usePrepareContractWrite({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "approve",
    args: [config.contract.address, ethers.utils.parseEther("50")],
  });
  const {
    data: approveData,
    write: approve,
    isSuccess: isApproved,
    isLoading: isApproving,
  } = useContractWrite(approveConfig);
  const { isSuccess: isApprovedSuccess, isLoading: isLoadingApproveTx } =
    useWaitForTransaction({
      hash: approveData?.hash,
    });

  useEffect(() => {
    if (isApprovedSuccess == true) {
      console.log("Approved success");
      update?.();
    }
  }, [isApprovedSuccess]);

  //for updating piggie
  const {
    config: updateConfig,
    isFetching,
    isError,
    error,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "updateBalance",
    args: [ethers.utils.parseEther("50")],
  });
  const {
    data: updateData,
    write: update,
    isSuccess: isUpdated,
    isLoading: isUpdating,
  } = useContractWrite(updateConfig);
  const { isSuccess: updatedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: updateData?.hash,
    });

  record && console.log(record);

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">Saved (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">
              {isGettingRecord ? (
                <p> Loading</p>
              ) : record && record.balance > 0 ? (
                ethers.utils.formatEther(record?.balance)
              ) : (
                "0.0"
              )}
            </span>
          </div>

          <CountDown />

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
                "00.0"
              )}
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
              disabled={isUpdating || isLoadingTx}
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-md p-3 mt-5 block w-full disabled:bg-grayed"
              onClick={() => approve?.()}
              disabled={isUpdating || isLoadingTx}
            >
              Update
            </button>
          </div>

          <BreakPiggy expiresAt={record.expiresAt} />
        </div>
      </div>
    </div>
  );
};
export default CountDownSection;
