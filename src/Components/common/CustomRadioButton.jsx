export const CustomRadioInput = ({
  name,
  labelList,
  register,
}) => {
  return (
    <div className="px-4 flex items-center gap-4">
      {labelList &&
        labelList.map((item, index) => (
          <div key={index} className="flex items-center py-1">
            <input
              // checked
              type="radio"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
              name={name}
              id={name + index}
              value={item.value}
              {...register(name)}
            />
            <label
              htmlFor={name + index}
              className="ml-2 text-sm font-medium text-black"
            >
              {item.label}
            </label>
          </div>
        ))}
    </div>
  );
};
