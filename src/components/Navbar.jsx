import Rack from "../components/icons/Rack";

import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = ({ toggle, setToggle }) => {
  return (
    <nav className="relative flex items-center justify-between p-3 lg:max-w-6xl xl:max-w-7xl mx-auto">
      <h3 className="font-bold tracking-loose text-xl uppercase p-4">Piggie</h3>
      <ConnectButton />
      <span
        className={`flex items-center space-x-2 cursor-pointer lg:hover:text-blue-300 ${
          toggle ? "text-blue-300" : "text-white"
        }`}
        onClick={() => setToggle(!toggle)}
      >
        <Rack />
        <span>Add Token</span>
      </span>
    </nav>
  );
};
export default Navbar;
