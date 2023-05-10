import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Rainy from "../components/Rainy";
import { Account } from "../components";
import Save from "../components/Save";
import CountDown from "../components/CountDown";

import { useState } from "react";
const Rack = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
    <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
    <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
    <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
  </svg>
);

function Page() {
  const { isConnected } = useAccount();
  const [step, setStep] = useState(1);
  return (
    <main className="relative min-h-screen font-inter">
      <nav className="flex items-center justify-between p-3 lg:max-w-6xl xl:max-w-7xl mx-auto">
        <h3 className="font-bold tracking-loose text-xl uppercase p-4">
          Piggie
        </h3>
        <div className="flex items-center space-x-2">
          <Rack />
          <span>Add Token</span>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center my-9">
        <h1 className="text-gray">Save for the rainy day</h1>
        <div className="w-32 h-32">
          <Rainy />
        </div>
      </div>

      {step == 1 ? <Save /> : <CountDown />}

      <footer className="absolute bottom-0 left-0 w-full p-5 flex justify-center items-center">
        <a
          href="https://blog.nnamdiumeh.dev"
          className="hover:text-white text-gray"
        >
          &copy; The Everyday Dev
        </a>
      </footer>
    </main>
  );
}

export default Page;
