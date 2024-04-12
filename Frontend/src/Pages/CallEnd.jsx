import Navbar from "../Components/Navbar";

const CallEnd = () => {

  return (
        <>
        <Navbar/>
    <div className="h-[calc(100vh-80px)] overflow-y-hidden  w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center gap-1 items-center rounded-xl h-[100px] bg-black min-w-[300px]">
        <h2 className="text-[30px] text-white font-bold">Call has ended.</h2>
      </div>
    </div>
    </>
  );
};

export default CallEnd;
