import { useState } from "react";

export const CustomPasswordField = ({ label, name, validation, register, errors, placeholder, disable, col, mandatory, className, style, labelClass }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`w-full ${col}`}>
      <div className={`flex flex-col  ${label ? "gap-2" : ""} relative`}>
        {label && (
          <label className={` font-DM-sans font-normal text-base leading-[22.4px] ${labelClass}`} htmlFor="">
            {label}
            {mandatory && <span className="text-red-500">&#42;</span>}
          </label>
        )}
        <div className="relative flex justify-center items-center">
          <input
            style={style}
            type={showPassword ? "text" : "password"}
            className={`focus:outline-none placeholder:text-Tertiary-colour(muted) text-secondary-black focus-border:none bg-background px-4 py-[15px] tracking-[-0.078px] rounded font-DM-sans font-normal w-full text-base ${
              errors?.[name]?.message ? "border-danger focus:border-danger" : ""
            } ${className}`}
            placeholder={placeholder}
            {...register(name, validation)}
            disabled={disable}
            readOnly={disable}
          />

          <div onClick={() => setShowPassword(!showPassword)} className="w-fit absolute cursor-pointer right-4 animation ">
            {showPassword ? (
              <svg width="18" height="14" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="114" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.95245 3.2436C9.29113 3.19353 9.64051 3.16667 10.0003 3.16667C14.2545 3.16667 17.0461 6.9207 17.9839 8.40569C18.0974 8.58542 18.1542 8.67528 18.1859 8.81389C18.2098 8.91799 18.2098 9.08222 18.1859 9.18631C18.1541 9.32492 18.097 9.41538 17.9827 9.59631C17.7328 9.99179 17.3518 10.5476 16.8471 11.1504M5.6036 4.59586C3.80187 5.81808 2.57871 7.51615 2.01759 8.4044C1.90357 8.58489 1.84656 8.67514 1.81478 8.81373C1.79091 8.91783 1.7909 9.08203 1.81476 9.18613C1.84652 9.32473 1.90328 9.41459 2.01678 9.59432C2.95462 11.0793 5.74618 14.8333 10.0003 14.8333C11.7157 14.8333 13.1932 14.223 14.4073 13.3972M2.50035 1.5L17.5003 16.5M8.23258 7.23223C7.78017 7.68464 7.50035 8.30964 7.50035 9C7.50035 10.3807 8.61963 11.5 10.0003 11.5C10.6907 11.5 11.3157 11.2202 11.7681 10.7678"
                  stroke="black"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        {errors && <div className="error text-white text-xs">{errors?.[name]?.message}</div>}
      </div>
    </div>
  );
};
