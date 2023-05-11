import { useAccount, useContractRead } from "wagmi";
import Rainy from "../components/Rainy";
import Save from "../components/Save";
import CountDown from "../components/CountDown";
import Navbar from "../components/Navbar";
import { useState } from "react";
import AddTokens from "../components/AddTokens";
import config from "../config";

function Page() {
  const { isConnected } = useAccount();
  const [toggle, setToggle] = useState(false);
  const [step, setStep] = useState(1);

  const { data, isSuccess, isError, error } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "getRecord",
  });

  isSuccess && console.log(data);
  isError && console.log(error.reason);

  return (
    <main className="relative overflow-hidden min-h-screen font-inter">
      <Navbar setToggle={setToggle} toggle={toggle} />
      <AddTokens toggle={toggle} setToggle={setToggle} />
      <section className="relative">
        <div className="flex flex-col justify-center items-center my-9">
          <h1 className="text-gray">Save for the rainy day</h1>
          <div className="w-32 h-32">
            <Rainy />
          </div>
        </div>

        {step == 1 ? <Save /> : <CountDown />}
      </section>
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
