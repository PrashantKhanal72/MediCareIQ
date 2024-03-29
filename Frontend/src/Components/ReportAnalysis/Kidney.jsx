import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { kidneyAnalysis } from "../../Api/reportAnalysis";
import { setKidneyPredict } from "../../redux-slices/reportSlices";

const Kidney = ({currentTab}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const { kidneyPredict } = useAppSelector(state => state.report)
  const [prediction, setPrediction] = useState('');

  const onSubmit = (data) => {
    dispatch(kidneyAnalysis(data));
  };

  useEffect(()=> {
     if(kidneyPredict !== null){
      if(kidneyPredict === 1) setPrediction('High')
      else if(kidneyPredict === 0) setPrediction('Low')
     }else{
      setPrediction('')
    }
  }, [kidneyPredict ])

  useEffect(()=> {
    if(currentTab !== 2)
    dispatch(setKidneyPredict(null))
  }, [currentTab])

  return (
    <div className=" h-full w-full flex flex-col px-12  mt-12">
      <form
        className="flex gap-[20px] w-full max-w-[1000px] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(onSubmit)} // Handling form submission
      >
        <div className="flex flex-col gap-3">
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="bloodPressure"
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
            type="number"
            name="specificGravity"
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

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albumin"
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
            name="bloodSugarLevel"
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
            name="redBloodCellsCount"
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
            name="pusCellCount"
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
            name="pusCellClumps"
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
      {
        prediction ? <h1 className={`!py-0 text-[20px] font-semibold ${prediction === 'High' ? 'text-red-600': 'text-yellow-500' }`}>Your chances of getting diesease is {prediction}</h1> : <></>
      }
    </div>
  );
};

export default Kidney;
