import { useContractRead } from "wagmi";
import config from "../config";
import { useAccount } from "wagmi";

const useGetRecordAndBalance = () => {
  const { isConnected, address } = useAccount();

  const { data: record } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "getRecord",
    watch: true,
    overrides: {
      from: address,
    },
  });

  const { data: balance } = useContractRead({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  return { record, balance };
};
export default useGetRecordAndBalance;
