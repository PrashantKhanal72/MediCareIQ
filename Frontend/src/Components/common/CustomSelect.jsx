import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const CustomSelect = ({ selectItem, selected, setSelected }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className={`relative w-full flex  items-center  cursor-pointer gap-3 ${selected?.selectedStyle}`}>
          {selected?.color && <div className={`w-2 h-2 rounded-full ${selected?.color}`}></div>}
          <span className={`block text-[13px] leading-[18px] truncate ${selected?.textStyle}`}>{selected?.name}</span>
          {/* {selected?.arrow && <WhiteArrowIcon className="-rotate-90 w-[8px]" />} */}
        </Listbox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-x-hidden overflow-auto rounded-md bg-white z-50 border border-background py-1 text-base shadow-lg focus:outline-none ">
            {selectItem.map((item, itemIdx) => (
              <Listbox.Option key={itemIdx} className={({}) => `relative cursor-default  text-[13px] w-fit leading-[18px] tracking-[0.02em] select-none py-2 px-5 `} value={item}>
                {({}) => (
                  <>
                    <div className="relative w-full  flex gap-2 items-center cursor-pointer">
                      {item?.color && <div className={`w-2 h-2 rounded-full ${item?.color}`}></div>}
                      <span className="block  truncate ">{item?.name}</span>
                    </div>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CustomSelect;
