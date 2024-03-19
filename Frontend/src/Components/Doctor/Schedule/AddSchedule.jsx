import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hook";
import { CustomInputField } from "../../common/CustomInputField";
import { createSchedule } from "../../../Api/doctor";

const AddSchedule = ({setIsOpen}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
     dispatch(createSchedule(data, setIsOpen))
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full gap-2"
      >
        <div className="flex flex-1">
          <div className="flex flex-col w-full gap-4">
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="date"
              name="availableDate"
              label="Available Date"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Available date is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Available date"}
            />
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="time"
              name="startTime"
              label="Start Time"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Start time is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Start Time"}
            />
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="time"
              name="endTime"
              label="End Time"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "End time is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"End Time"}
            />

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

export default AddSchedule;
