import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { diabiatesAnalysis } from "../../Api/reportAnalysis";
import { setDiabetesPredict } from "../../redux-slices/reportSlices";

const Diabiates = ({currentTab}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const { diabetesPredict } = useAppSelector(state => state.report)
  const [prediction, setPrediction] = useState('');

  const onSubmit = (data) => {
    dispatch(diabiatesAnalysis(data));
  };

  useEffect(()=> {
    if(diabetesPredict !== null){
     if(diabetesPredict === 1) setPrediction('High')
     else if(diabetesPredict === 0) setPrediction('Low')
    }else{
     setPrediction('')
   }
 }, [diabetesPredict ])

 useEffect(()=> {
   if(currentTab !== 3)
   dispatch(setDiabetesPredict(null))
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
            name="noOfPregnencies"
            label="No. of Pregnencies"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "No. of Pregnencies is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"No. of Pregnencies"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="glucoseLevel"
            label="Glucose Level"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Glucose Level is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Glucose Level"}
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="currentBloodPressure"
            label="Current Blood Pressure"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Current Blood Pressure is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Current Blood Pressure"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="bMI"
            label="BMI"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "BMI is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"BMI"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="diabetesPedigreeFunction"
            label="Diabetes Pedigree Function"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Diabetes Pedigree Function is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Diabetes Pedigree Function"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="age"
            label="Age"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Age is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Age"}
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
      {
        prediction ? <h1 className={`!py-0 text-[20px] font-semibold ${prediction === 'High' ? 'text-red-600': 'text-yellow-500' }`}>Your chances of getting diesease is {prediction}</h1> : <></>
      }
    </div>
  );
};

export default Diabiates;
