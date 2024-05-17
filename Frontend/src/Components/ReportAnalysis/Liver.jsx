import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInputField } from "../common/CustomInputField";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { liverAnalysis } from "../../Api/reportAnalysis";
import { setLiverPredict } from "../../redux-slices/reportSlices";

const Liver = ({ currentTab }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const { liverPredict } = useAppSelector((state) => state.report);
  const [prediction, setPrediction] = useState("");

  const onSubmit = (data) => {
    dispatch(liverAnalysis(data));
  };

  useEffect(() => {
    if (liverPredict !== null) {
      if (liverPredict === 1) setPrediction("High");
      else if (liverPredict === 0) setPrediction("Low");
    } else {
      setPrediction("");
    }
  }, [liverPredict]);

  useEffect(() => {
    if (currentTab !== 4) dispatch(setLiverPredict(null));
  }, [currentTab]);

  return (
    <div className=" h-full w-full flex flex-col px-12  mt-12">
    <p>It is aimed as identifying individuals with liver disease through various biochemical and clinical parameters. It doesn't target a specific liver condition but rather discerns the presence of liver disease in general. Key indicators in the dataset include bilirubin levels, liver enzyme levels, and protein levels in the blood, which are critical for diagnosing and monitoring liver health.</p>
      <form
        className="flex gap-[20px] w-full max-w-[1000px] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(onSubmit)} // Handling form submission
      >
        <div className="flex flex-col gap-3">
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="totalBilirubin"
            label="Total Bilirubin"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Total Bilirubin is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Total bilirubin in the blood, measured in milligrams per deciliter (mg/dL).Range: 0.4 to 75 mg/dL"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="directBilirubin"
            label="Direct Bilirubin"
            labelClass="text-[15px] mb-1 font-medium"
            validation={{
              required: {
                value: true,
                message: "Direct Bilirubin is required",
              },
            }}
            register={register}
            errors={errors}
            placeholder={"Direct bilirubin in the blood, measured in milligrams per deciliter (mg/dL). Range: 0.1 to 19.7 mg/dL"}
          />

          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="alkalinePhosphotase"
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
            placeholder={"Alkaline phosphatase enzyme in the blood, measured in international units per liter (IU/L). Range: 63 to 2110 IU/L"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="alamineAminotransferase"
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
            placeholder={"Alanine aminotransferase enzyme in the blood, measured in international units per liter (IU/L). Range: 10 to 2000 IU/L"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="totalProtiens"
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
            placeholder={"Total proteins in the blood, measured in grams per deciliter (g/dL). Range: 2.7 to 9.6 g/dL"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albumin"
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
            placeholder={"Albumin protein in the blood, measured in grams per deciliter (g/dL). Range: 0.9 to 5.5 g/dL"}
          />
          <CustomInputField
            className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="number"
            name="albuminGlobulinRatio"
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
            placeholder={"he ratio of albumin to globulin in the blood, unitless. Range: 0.3 to 2.8"}
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
        prediction ? <h1 className={`!py-0 text-[20px] font-semibold ${prediction === 'High' ? 'text-red-600': 'text-yellow-500' }`}>Your chances of getting Liver diesease is {prediction}</h1> : <></>
      }
    </div>
  );
};

export default Liver;
