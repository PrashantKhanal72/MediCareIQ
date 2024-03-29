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
            name="directBilirubin"
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
            placeholder={"Alkaline Phosphotase"}
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
            placeholder={"Alamine Aminotransferase"}
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
            placeholder={"Total Protiens"}
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
            placeholder={"Albumin"}
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

export default Liver;
