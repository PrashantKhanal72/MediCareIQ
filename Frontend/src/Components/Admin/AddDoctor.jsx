import React from "react";
import { CustomInputField } from "../common/CustomInputField";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../Pages/LoginPage";
import { CustomPasswordField } from "../common/CustomPasswordField";
import { useAppDispatch } from "../../redux/hook";
import { createDoctorAccount } from "../../Api/admin";
import ImageUpload from '../common/ImageUpload'
import { CustomRadioInput } from "../common/CustomRadioButton";
import { CustomDropDownSelect } from "../common/CustomDropDownSelect";

const AddDoctor = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm();

  const dispatch = useAppDispatch();

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

  const doctorType = [
    {
      name: "Specialist",
      value: "Specialist",
    },
    {
      name: "Physician",
      value: "Physician",
    },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("age", 1);
    formData.append("address", data.address);
    formData.append("speciality", data.speciality);
    formData.append("password", data.password);
    formData.append("doctor_type", data.doctor_type);
    formData.append("gender", data.gender);
    if(data.image && data.image.length){
      formData.append("profileImage", data.image[0])
    }
    dispatch(createDoctorAccount(formData, setIsOpen));
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full gap-2"
      >
        <div className="flex flex-1">
          <div className="flex flex-col w-full gap-2">
            <ImageUpload
              name="image"
              register={register}
              setValue={setValue}
              watch={watch}
            />
            <div className="flex gap-4">
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
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
            <CustomInputField
              className="!rounded-md flex-1 !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
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
            </div>
            <div className="flex-1">
            <CustomDropDownSelect
            register={register}
            name={"doctor_type"}
            labelClass="!text-[15px] !font-medium mb-1"
            setValue={setValue}
            className="!rounded-r-lg !text-[13px] leading-[18px]"
            clearErrors={clearErrors}
            validation={{
              required: { value: true, message: "Select type" },
            }}
            label={"Doctor Type"}
            dropdown={doctorType}
            errors={errors}
            placeholder="Doctor Type"
          />
          </div>
            </div>
            <div className="flex gap-4">
              <CustomInputField
                className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
                type="text"
                name="address"
                label="Address"
                validation={{
                  required: {
                    value: true,
                    message: "Address is required",
                  },
                }}
                register={register}
                errors={errors}
                placeholder={"Address"}
              />

              <CustomInputField
                className="!rounded-md !border-[#a1a0a0] !border !font-SF-Pro-text !text-[13px] leading-[18px]"
                type="text"
                name="speciality"
                label="Speciality"
                // validation={{
                //   required: {
                //     value: true,
                //     message: "Speciality is required",
                //   },
                // }}
                register={register}
                errors={errors}
                placeholder={"Speciality"}
              />
            </div>
            <div className="flex gap-4">
            <div className="flex flex-1 gap-4 py-2 items-center">
              <p className="text-[15px] font-medium whitespace-nowrap">Gender:</p>
              <CustomRadioInput
                name={"gender"}
                labelList={labelList}
                register={register}
              />
            </div>
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
