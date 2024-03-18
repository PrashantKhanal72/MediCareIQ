import { useForm } from "react-hook-form"; // Hook for form handling
import { useAppDispatch } from "../redux/hook"; // Custom hook for Redux dispatch function
import { CustomInputField } from "../Components/common/CustomInputField";
import { CustomPasswordField } from "../Components/common/CustomPasswordField";
import { Link } from "react-router-dom"; // Component for navigation links
import { login } from "../Api/auth"; // API function for login

// Regular expression for validating email format
export const emailRegex =
  /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const LoginPage = () => {
  // Initializing form handling functions and state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    const dispatch = useAppDispatch();

  // Function to handle login on form submit
  const handleLogin = (data) => {
    dispatch(login(data)) // Dispatching login action with form data

  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="flex gap-[20px] w-full max-w-[440px] bg-[#4065E0] p-6 bg-primary flex-col rounded-2xl"
        onSubmit={handleSubmit(handleLogin)}
      >
      {/* Form content, including custom input fields for email and password */}

        <div className="flex w-full justify-center">
          <p className="font-DM-sans font-bold text-white text-[20px] leading-[25px]">
            Login
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <CustomInputField
            className="!rounded-lg !font-SF-Pro-text !text-[13px] leading-[18px]"
            type="email"
            name="email"
            errorColor='white'
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
            className="!rounded-lg px- bg-background !font-DM-sans !text-[13px] leading-[18px] "
            name={"password"}
            validation={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
            errorColor='white'
            register={register}
            errors={errors}
            placeholder={"Password"}
          />

          <p className="text-white text-left leading-[20px] font-medium text-[13px] font-DM-sans">
            {" "}
            Create new account:{" "}

            {/* Link to registration page for users without an account */}

            <Link to="/register">
              <span className="text-[#53fb53] underline text-right leading-[20px] font-bold text-[13px] font-DM-sans">
                Register
              </span>
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className={`py-[14px] bg-[#00A8E8] rounded-lg w-full
      `}
        >
          <div className="flex justify-center gap-1 items-center">
            <span></span>
            <span className="font-DM-sans text-white text-[16px] leading-5 font-bold">
              Login
            </span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
