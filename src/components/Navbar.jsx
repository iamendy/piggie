import Rack from "../components/icons/Rack";
import { useAccount } from "wagmi";

const Navbar = ({ toggle, setToggle }) => {
  const { isConnected } = useAccount();

  return (
    <nav className="relative flex items-center justify-between p-3 lg:max-w-6xl xl:max-w-7xl mx-auto">
      <h3 className="font-bold tracking-loose text-xl uppercase p-4">Piggie</h3>

      <div className="flex items-center justify-center bg-dark rounded-md p-1 space-x-1">
        <span className="">{isConnected ? "online" : "offline"}</span>
        <div
          className={`rounded-full w-2 h-2 text-xs ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      </div>

      <span
        className={`flex items-center space-x-2 cursor-pointer lg:hover:text-blue-300 ${
          toggle ? "text-blue-300" : "text-white"
        }`}
        onClick={() => setToggle(!toggle)}
      >
        <Rack />
        <span>Get Tokens</span>
      </span>
    </nav>
  );
};
export default Navbar;
