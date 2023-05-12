import Close from "../components/icons/Close";
import SignOut from "../components/icons/SignOut";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import config from "../config";
import { ethers } from "ethers";
import {
  useDisconnect,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const AddTokens = ({ toggle, setToggle }) => {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const {
    config: mintConfig,
    isFetching,
    isError,
    error,
  } = usePrepareContractWrite({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "mint",
    args: [ethers.utils.parseEther("100")],
    //enabled: false,
  });

  const {
    write: mint,
    isLoading: isMinting,
    isSuccess: mintSuccessful,
  } = useContractWrite(mintConfig);

  return (
    <section
      className={`${
        toggle ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity ease-in duration-300 absolute top-[10%] right-0 w-full h-full bg-black/60 backdrop-blur z-50`}
    >
      <div className="absolute w-3/4 lg:w-1/4 top-0 right-0 h-full bg-dark shadow drop-shadow-md p-5">
        <Close toggle={toggle} setToggle={setToggle} />
        <p className="text-grayed">
          {" "}
          Claim free tokens <br /> {address}{" "}
        </p>

        <div className="mt-5 space-y-4">
          <div className="flex flex-col border-gray border px-4 py-2 rounded-lg">
            <span className="text-gray">Amount</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="200"
              type="text"
              disabled={isMinting}
            />
          </div>
          <div>
            {isConnected ? (
              <button
                className="bg-blue-300 hover:bg-blue-500 active:bg-blue-600 disabled:bg-grayed rounded-md p-3 block w-full"
                onClick={() => mint()}
                disabled={isMinting}
              >
                {isMinting ? "Minting.." : "Mint"}
              </button>
            ) : (
              openConnectModal && (
                <button
                  className="bg-blue-300 hover:bg-blue-500 active:bg-blue-600  rounded-md p-3 block w-full"
                  onClick={() => openConnectModal()}
                >
                  Connect
                </button>
              )
            )}
          </div>
        </div>
        <div className="absolute bottom-24 lg:bottom-32 right-0 px-4 w-full">
          {isConnected && (
            <button
              className="text-red-400 p-3 rounded-md w-full flex items-center justify-center space-x-2"
              onClick={() => {
                disconnect();
                setToggle(!toggle);
              }}
            >
              <span>Disconnect</span>
              <SignOut />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
export default AddTokens;
