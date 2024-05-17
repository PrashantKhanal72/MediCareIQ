import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";
import { CustomDropDownSelect } from "../common/CustomDropDownSelect";
import {
  chestPainType,
  exerciseInducedAngina,
  fastingBloodSugar,
  restingElectroCardiographic,
} from "./heartData";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { heartAnalysis } from "../../Api/reportAnalysis";
import { setHeartPredict } from "../../redux-slices/reportSlices";

const Heart = ({currentTab}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm();
  const { heartPredict } = useAppSelector(state => state.report)

  const [prediction, setPrediction] = useState('');

  const onSubmit = (data) => {
     dispatch(heartAnalysis(data))
  };

  useEffect(()=> {
    if(heartPredict !== null){
     if(heartPredict === 1) setPrediction('High')
     else if(heartPredict === 0) setPrediction('Low')
    }else{
     setPrediction('')
   }
 }, [heartPredict ])


// This is used to clear the prediction once the page is changed.
 useEffect(()=> {
   if(currentTab !== 5)
   dispatch(setHeartPredict(null))   
 }, [currentTab])

  return (
    <div className=" h-full w-full flex flex-col px-12  mt-12">
    <p>Coronary artery disease (CAD) is a condition where the narrowing of coronary arteries restricts blood flow to the heart muscle, potentially leading to heart attacks or other cardiovascular complications.</p>
      <form
        className="flex gap-[20px] w-full max-w-[1000px] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(onSubmit)} // Handling form submission
      >
        <div className="flex flex-col gap-3">
          <CustomDropDownSelect
            register={register}
            name={"totalBilirubin"}
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
            placeholder=" Select Chest pain type."
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="directBilirubin"
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
            placeholder={"Resting systolic Blood Pressure in mm Hg. Range: 94 to 200 mm Hg"}
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="alkalinePhosphotase"
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
            placeholder={"Serum cholesterol in milligrams per deciliter (mg/dL). Range: 126 to 564 mg/dL"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="totalProtiens"
            label="Total Proteins"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Total Protein is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Total proteins in the blood, measured in grams per deciliter (g/dL). Range: 2.7 to 9.6 g/dL"}
          />

          <CustomDropDownSelect
            register={register}
            name={"alamineAminotransferase"}
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
            placeholder="Select Fasting blood sugar"
          />

          <CustomDropDownSelect
            register={register}
            name={"albuminGlobulinRatio"}
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
            name={"albumin"}
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
      {
        prediction ? <h1 className={`!py-0 text-[20px] font-semibold ${prediction === 'High' ? 'text-red-600': 'text-yellow-500' }`}>Your chances of getting heart diesease is {prediction}</h1> : <></>
      }
    </div>
  );
};

export default Heart;
