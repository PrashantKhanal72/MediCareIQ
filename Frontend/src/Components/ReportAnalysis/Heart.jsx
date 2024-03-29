import React from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";
import { CustomDropDownSelect } from "../common/CustomDropDownSelect";
import {
  chestPainType,
  exerciseInducedAngina,
  fastingBloodSugar,
  restingElectroCardiographic,
} from "./heartData";
import { useAppDispatch } from "../../redux/hook";
import { heartAnalysis } from "../../Api/reportAnalysis";

const Heart = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
     dispatch(heartAnalysis(data))
  };

  return (
    <div className=" h-full w-full flex flex-col px-12  mt-12">
      <form
        className="flex gap-[20px] w-full max-w-[1000px] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(onSubmit)} // Handling form submission
      >
        <div className="flex flex-col gap-3">
          <CustomDropDownSelect
            register={register}
            name={"chest_pain_type"}
            labelClass="!text-[15px] !font-medium mb-1"
            setValue={setValue}
            className="!rounded-r-lg !text-[13px] leading-[18px]"
            clearErrors={clearErrors}
            validation={{
              required: { value: true, message: "Select the type" },
            }}
            label={"Chest Pain Type"}
            dropdown={chestPainType}
            errors={errors}
            placeholder="Select Chest Pain Type"
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="rest_blood_pressure"
            label="Resting Blood Pressure"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Resting Blood Pressure is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Resting Blood Pressure"}
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="serum_cholestoral"
            label="Serum Cholestoral"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Serum Cholestoral is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Serum Cholestoral"}
          />

          <CustomDropDownSelect
            register={register}
            name={"fasting_blood_sugar"}
            labelClass="!text-[15px] !font-medium mb-1"
            setValue={setValue}
            className="!rounded-r-lg !text-[13px] leading-[18px]"
            clearErrors={clearErrors}
            validation={{
              required: { value: true, message: "Select the data" },
            }}
            label={"Fasting Blood Sugar"}
            dropdown={fastingBloodSugar}
            errors={errors}
            placeholder="Select Fasting Blood Sugar"
          />

          <CustomDropDownSelect
            register={register}
            name={"restingElectroCardiographic"}
            labelClass="!text-[15px] !font-medium mb-1"
            setValue={setValue}
            className="!rounded-r-lg !text-[13px] leading-[18px]"
            clearErrors={clearErrors}
            validation={{
              required: { value: true, message: "Select the data" },
            }}
            label={"Resting Electro-cardiographic Result"}
            dropdown={restingElectroCardiographic}
            errors={errors}
            placeholder="Select Resting Electro-cardiographic Result"
          />

          <CustomDropDownSelect
            register={register}
            name={"restingElectroCardiographic"}
            labelClass="!text-[15px] !font-medium mb-1"
            setValue={setValue}
            className="!rounded-r-lg !text-[13px] leading-[18px]"
            clearErrors={clearErrors}
            validation={{
              required: { value: true, message: "Select the data" },
            }}
            label={"Exercise Induced Angina"}
            dropdown={exerciseInducedAngina}
            errors={errors}
            placeholder="Select Exercise Induced Angina"
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

export default Heart;
