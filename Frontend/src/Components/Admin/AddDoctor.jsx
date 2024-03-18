import React from "react";
import { CustomInputField } from "../common/CustomInputField";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../Pages/LoginPage";
import { CustomPasswordField } from "../common/CustomPasswordField";
import { useAppDispatch } from "../../redux/hook";
import { createDoctorAccount } from "../../Api/admin";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
     dispatch(createDoctorAccount(data))
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
              type="text"
              name="first_name"
              label="First Name"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "First Name is required",
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
              label="last Name"
              labelClass="text-[15px] mb-1 font-medium"
              validation={{
                required: {
                  value: true,
                  message: "last name is required",
                },
              }}
              register={register}
              errors={errors}
              placeholder={"Last Name"}
            />

            <CustomInputField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              type="email"
              name="email"
              label="Email"
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

            <CustomPasswordField
              className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
              name={"password"}
              label="Password"
              validation={{
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              errorColor="white"
              register={register}
              errors={errors}
              placeholder={"Password"}
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

export default AddDoctor;
