import React from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";

const Diabiates = () => {
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
              label="Total Bilirubin"
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
              label="Direct Bilirubin"
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
            label="Alkaline Phosphotase"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Alkaline Phosphotase is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Alkaline Phosphotase"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Alamine Aminotransferase"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Alamine Aminotransferase is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Alamine Aminotransferase"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Total Protiens"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Total Protiens is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Total Protiens"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Albumin"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Albumin is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Albumin"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albunium"
            label="Albumin and Globulin Ratio"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Albumin and Globulin Ratio is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Albumin and Globulin Ratio"}
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

export default Diabiates;
