import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export const CustomDropDownSelect = ({
  label,
  name,
  validation,
  register,
  clearErrors,
  errors,
  dropdown,
  placeholder,
  setValue,
  value,
  disable,
  message,
  col,
  after,
  mandatory,
  labelClass,
  edit,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState("");

//   useEffect(() => {
//     if (edit !== undefined || edit !== null) {
//       const val = dropdown.find((data) => data.value === edit);
//       setSelectedItem(val?.name ?? "");
//       setValue(name, edit);
//     }
//   }, [edit, dropdown]);

  const handleChange = (data) => {
    // reset({
    //   [name]: data.value,
    // });
    setValue(name, data.value);
    clearErrors(name);
    setSelectedItem(data.name);
  };

  useEffect(() => {
    if (value || value === "") {
      const val = dropdown.find((data) => data.value === value);
      setSelectedItem(val?.name ?? "");
    }
  }, [value]);

  // useEffect(() => {
  //   console.log(dropdown, "yeta bata");
  // }, [dropdown]);

  return (
    <div className={`w-full ${col} ${after && "after"}`}>
      <div className={`flex w-full flex-col`}>
        {label && (
          <label
            className={` font-normal text-base ${labelClass}`}
            htmlFor=""
          >
            {label}
            {mandatory && <span className="text-red-500">&#42;</span>}
          </label>
        )}
        <input
          type="text"
          defaultValue={value}
          name={name}
          {...register(name, validation)}
          className="!hidden"
        />
        <div className={``}>
          <Listbox onChange={handleChange} disabled={disable}>
            <div className="relative">
              <Listbox.Button
                className={`focus:outline-none text-left placeholder:text-[#777777] text-[#000000] focus-border:none border-[1px] border-[#A1A0A0] px-4 py-[15px] tracking-[-0.078px] rounded font-normal w-full text-base ${
                  errors?.[name]?.message
                    ? "border-danger focus:border-danger"
                    : ""
                } ${className}`}
              >
                {selectedItem ? (
                  <span
                    className={`text-left text-[13px] truncate ${
                      disable ? "text-[#A7A7A7]" : "text-[#000000]"
                    }`}
                  >
                    {selectedItem}
                  </span>
                ) : (
                  <span className="text-left text-[#777777]  line-clamp">
                    {placeholder}
                  </span>
                )}

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  {/* icon  */}
                  <span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={`absolute w-full rounded-lg mt-1 border-t border-gray-100 overflow-auto text-black bg-[#FFFFFF] tracking-[-0.24px]  
                           max-h-60 shadow-lg 
                            z-10`}
                >
                  {dropdown.length === 0 ? (
                    <div className="cursor-pointer relative flex items-center text-xs sm:text-[15px] font-SF-Pro-text select-none hover:bg-[#4a4aed] hover:bg-opacity-50 animation py-4 px-14">
                      {message}
                    </div>
                  ) : (
                    <>
                      {dropdown.map((data, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `${
                              active ? "" : ""
                            } cursor-pointer relative flex items-center text-xs sm:text-[15px] font-SF-Pro-text select-none hover:bg-[#383839] hover:bg-opacity-50 hover:text-white animation py-3 px-12 `
                          }
                          value={data}
                        >
                          {({ value, active }) => (
                            <>
                              <span className={` truncate text-xs`}>
                                {data.name}
                              </span>
                              <div
                                className={`absolute left-4 text-[#3A5FF7] transform ${
                                  active ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                {/* <BoxTickIcon className="w-7 h-7" /> */}
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {errors && (
          <div className="error text-red-600 text-xs">
            {errors?.[name]?.message}
          </div>
        )}
      </div>
    </div>
  );
};
