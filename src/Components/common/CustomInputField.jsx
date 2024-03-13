export const CustomInputField = ({
  label, // label for input field
  type, // type of input field
  name, // name of input field
  validation, // validation for input field
  register, // react hook form register
  errors, // react hook form errors
  placeholder, // placeholder for input field
  disable, // boolean value for disable input field
  value,
  col,
  mandatory, // boolean value for mandatory input field give red color * mark
  className, // class for input field
  labelClass, // class for label
}) => {

  return (
    <div className={`w-full h-fit ${col}`}>
        <div className={`flex flex-col `}>
          <label className={labelClass} htmlFor="">
            {label}
            {mandatory && <span className="text-red-600">&#42;</span>}
          </label>
          <input
            type={type}
            value={value}
            className={` focus:outline-none bg-background p-4 text-sm leading-4 placeholder:text-tertiary-colour ${
              errors?.[name]?.message ? "!border-paradise-pink-error !focus:border-paradise-pink-error" : ""
            } ${className}`}
            placeholder={placeholder}
            disabled={disable}
            readOnly={disable}
            {...register(name, validation)}
            onWheel={(e) => e.currentTarget.blur()}
          />

          {errors && <div className="text-xs error text-white">{errors?.[name]?.message}</div>}
        </div>
    </div>
  );
};
