const CountDown = () => {
  return (
    <div className="w-[90%] lg:max-w-2xl mx-auto">
      <div className="p-5 bg-dark rounded-md lg:p-8 xl:p-9 min-h-9xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm">saved (PTK)</span>
            <span className="text-2xl lg:text-4xl font-extrabold">0.00</span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-gray text-xs lg:text-sm mx-auto">
              Countdown
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              01.60.00
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray text-xs lg:text-sm ml-auto">
              Balance
            </span>
            <span className="text-2xl lg:text-4xl font-extrabold ml-auto">
              0.00
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
            />
            <button className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 rounded-md p-3 mt-5 block w-full">
              Update
            </button>
          </div>

          <div className="">
            <span className="text-xs text-red-300">
              You can only break piggy after countdown
            </span>
            <button className="bg-grayed rounded-md p-5 block w-full ">
              Break Piggy 🔨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountDown;
