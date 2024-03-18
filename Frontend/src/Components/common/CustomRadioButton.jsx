// CustomRadioInput component declaration with destructured prop
export const CustomRadioInput = ({
  name, // Name attribute shared by all radio buttons in the group, ensuring only one can be selected at a time
  labelList, // An array of objects where each object represents a radio option with a label and a value
  register, // React Hook Form's register function to connect each radio input to the form for validation and data submission
}) => {
  return (
    <div className="px-4 flex items-center gap-4">
      {labelList && /* Check if labelList is provided*/
        labelList.map((item, index) => (
          /* Iterate over each item in the labelList*/
          <div key={index} className="flex items-center py-1">
            <input
              
              type="radio" /* Set the input type to radio */
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
              name={name} //Set the name attribute to the provided name prop
              id={name + index} // Unique ID for each radio button, combining the name and its index
              value={item.value} // Set the value attribute to the value from the current item
              {...register(name)} // Register the radio button with React Hook Form using the name
            />
            <label
              htmlFor={name + index} // Associate the label with its corresponding radio button using htmlFor
              className="ml-2 text-sm font-medium text-black"
              //Display the label text from the current item
            >
              {item.label}
            </label>
          </div>
        ))}
    </div>
  );
};
