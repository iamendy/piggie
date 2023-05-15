import Rack from "../components/icons/Rack";
import { useAccount, useNetwork } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";

const Navbar = ({ toggle, setToggle }) => {
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const { chain } = useNetwork();

  return (
    <nav className="relative flex items-center justify-between p-3 lg:max-w-6xl xl:max-w-7xl mx-auto">
      <h3 className="font-bold tracking-loose text-xl uppercase p-4">Piggie</h3>

      {openChainModal ? (
        <div
          onClick={openChainModal}
          className=" cursor-pointer flex items-center justify-center bg-dark rounded-md p-1 space-x-1"
        >
          <span className="">
            {isConnected && chain.id == 44787
              ? "online"
              : chain.id !== 44787
              ? "wrong network"
              : "offline"}
          </span>
          <div
            className={`rounded-full w-2 h-2 text-xs ${
              isConnected && chain.id == 44787
                ? "bg-green-500"
                : chain.id !== 44787
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
        </div>
      ) : (
        !isConnected && (
          <div
            className=" cursor-pointer flex items-center justify-center bg-dark rounded-md p-1 space-x-1"
            onClick={openConnectModal}
          >
            connect 🌍
          </div>
        )
      )}
      <span
        className={`flex items-center space-x-2 cursor-pointer lg:hover:text-blue-300 ${
          toggle ? "text-blue-300" : "text-white"
        }`}
        onClick={() => setToggle(!toggle)}
      >
        <Rack />
        <span>Get Tokens </span>
      </span>
    </nav>
  );
};
export default Navbar;
