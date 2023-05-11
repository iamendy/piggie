import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Save = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">Savings (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">0.00</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm ml-auto">
              Balance (PTK)
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              0.00
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
            />
          </div>

          <div className="flex flex-col border-gray border px-4 py-2 rounded-lg">
            <span className="text-gray">Duration</span>
            <input
              className="py-3 px-0 focus:outline-none bg-transparent"
              placeholder="5 days"
              type="text"
            />
          </div>

          <div>
            {isConnected ? (
              <button className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-md p-5 block w-full">
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
