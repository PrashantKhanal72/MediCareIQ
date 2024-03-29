// Exporting a functional component CustomInputField with props for customization
export const CustomInputField = ({
  label, // label for input field
  type, // type of input field
  name, // name of input field
  validation, // validation rules for React Hook Form
  register, // react hook form register
  errors, // react hook form errors
  placeholder, // placeholder for input field
  disable, // boolean value to disable input field
  value,
  col, //Additional styling for column layout
  mandatory, // boolean value for mandatory input field give red color * mark
  className, // class for input field
  labelClass, // class for label
  errorColor // Custom color for the error message text
}) => {

  return (
    <div className={`w-full h-fit ${col}`}>
        <div className={`flex flex-col `}>
          <label className={labelClass} htmlFor="">
            {label /* If field is mandatory, display a red asterisk */}
            {mandatory && <span className="text-red-600">&#42;</span>} 
          </label>
          <input
            type={type}
            value={value}
            className={` focus:outline-none bg-background p-4 text-sm leading-4 placeholder:text-tertiary-colour ${
              errors?.[name]?.message ? "!border-paradise-pink-error !focus:border-paradise-pink-error" : ""
            } ${className}`}
            step={ type === 'number' ? "0.01" : "1"}
            placeholder={placeholder}
            disabled={disable}
            readOnly={disable}
            {...register(name, validation) /*Registers the input field with React Hook Form for validation*/}
            onWheel={(e) => e.currentTarget.blur() /*Prevents scrolling from changing the value if the field type is number*/}
          />

          {errors && <div className={`text-xs error ${errorColor === 'white' ? 'text-white': 'text-red-600'} `}>{errors?.[name]?.message}</div> /*Displays any validation errors*/}
        </div>
    </div>
  );
};
