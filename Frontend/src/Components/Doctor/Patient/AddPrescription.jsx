import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hook";
import { CustomInputField } from "../../common/CustomInputField";
import { createPrescription } from "../../../Api/doctor";
import { useState } from "react";

const AddPresciption = ({ setIsOpen, patientId }) => {
  const [prescription, setPrescription] = useState("");

  const { handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    const postData = {
      patient_id: patientId,
      description: prescription ?? "",
    };
    dispatch(createPrescription(postData, setIsOpen));
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full gap-2"
      >
        <div className="flex flex-1">
          <div className="flex p-4 rounded-xl w-full h-[150px] border-[1px] border-black  ">
            <textarea
              placeholder="Type your prescription here..."
              name="description"
              className="w-full h-full focus:outline-none text-[14px] leading-[19px] text-[#272727] text-opacity-85 bg-inherit resize-none"
              value={prescription}
              onChange={(e) => setPrescription(e?.target?.value ?? "")}
              autoFocus
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className={`py-[14px] bg-[#21a030] px-1 rounded-lg w-full`}
        >
          <span className="font-DM-sans text-white text-[16px] leading-5 font-bold">
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddPresciption;
