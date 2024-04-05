import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-[30px] font-bold">Payment succed.</h2>
        <button
          onClick={() => navigate("/patient/appointments")}
          className="px-4 text-white rounded-sm bg-purple-500 py-2"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default Success;
