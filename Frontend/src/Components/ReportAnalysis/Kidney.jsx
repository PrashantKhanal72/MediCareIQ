import React from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";

const Kidney = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className=" h-full w-full flex flex-col px-12  mt-12">
      <form
        className="flex gap-[20px] w-full max-w-[1000px] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(onSubmit)} // Handling form submission
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="text"
              name="blood_pressure"
              label="Blood Pressure"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Blood Pressure is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Blood Pressure"}
            />
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="text"
              name="specific_gravity"
              label="Specific Gravity"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Specific Gravity is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Specific Gravity"}
            />
          </div>

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Albunium"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Albunium is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Albunium"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Blood Sugar Level"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Blood Sugar Level is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Blood Sugar Level"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Red Blood Cells Count"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Red Blood Cells Count is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Red Blood Cells Count"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Pus Cell Count"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Pus Cell Count is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Pus Cell Count"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Pus Cell Clumps"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Pus Cell Clumps is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Pus Cell Clumps"}
          />
        </div>

        <button
          type="submit"
          className={`py-[14px] bg-[#21a030] rounded-lg w-full
      `}
        >
          <div className="flex justify-center gap-1 items-center">
            <span></span>
            <span className="font-DM-sans text-white text-[16px] leading-5 font-bold">
              Submit
            </span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Kidney;
