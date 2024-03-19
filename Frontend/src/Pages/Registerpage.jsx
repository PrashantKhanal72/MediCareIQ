import React from "react";
import Navbar from "../Components/Navbar";
import { CustomPasswordField } from "../Components/common/CustomPasswordField";
import { CustomInputField } from "../Components/common/CustomInputField";
import { emailRegex } from "./LoginPage";
import { useForm } from "react-hook-form";
import { CustomRadioInput } from "../Components/common/CustomRadioButton";
import { useAppDispatch } from "../redux/hook";
import { registerUser } from "../Api/auth";

// RegisterPage component definition
const Registerpage = () => {
// Hook for dispatching actions with Redux
  const dispatch = useAppDispatch();


  // Initializing form handling from react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();


// Labels for radio input for gender selection
  const labelList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  // Function to handle form submission
  const onSubmit = (data) => {
      dispatch(registerUser(data)) // Dispatching action to register user with form data
  }

  return (
    <>
      <Navbar />
      <div className=" h-full w-full flex flex-col px-12  mt-12">
        <h2 className="text-[24px] leading-[30px] font-semibold"> Register here </h2>
        <p>Please fill the form with correct information.</p>
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
                label="First Name"
                labelClass="text-[15px] mb-1 font-medium"
                validation={{
                  required: {
                    value: true,
                    message: "firstName is required",
                  },
                }}
                register={register}
                errors={errors}
                placeholder={"First Name"}
              />
              <CustomInputField
                className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
                type="text"
                name="last_name"
                label="Last Name"
                labelClass="text-[15px] mb-1 font-medium"
                validation={{
                  required: {
                    value: true,
                    message: "lastName is required",
                  }
                }}
                register={register}
                errors={errors}
                placeholder={"Last Name"}
              />
            </div>

            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="email"
              name="email"
              label="Email"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: emailRegex,
                  message: "Invalid Email.",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Email address"}
            />

           <div className="flex gap-10">
            <div className="flex gap-12 py-2 items-center">
              <p className="text-[15px] font-medium">Gender : </p>
              <CustomRadioInput
                name={"gender"}
                labelList={labelList}
                register={register}
              />
            </div>
            <div className="w-[300px]">
            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="number"
              name="age"
              label="Age (years)"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Age is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Enter your age"}
            />
            </div>
            </div>

            <CustomPasswordField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              name={"password"}
              label="Password"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: " Password is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Password"}
            />
            <CustomPasswordField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              name={"confirmPassword"}
              label="Confirm Password"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Confirm Password"}
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
                Register
              </span>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default Registerpage;
