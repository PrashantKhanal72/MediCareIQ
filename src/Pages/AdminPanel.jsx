import { Tab } from "@headlessui/react";
import DoctorList from "../Components/Admin/DoctorList";
import UserList from "../Components/Admin/UserList";

const AdminPanel = () => {
  return (
    <div className="h-full w-full">
      <h2 className="text-center mt-12 text-[24px] leading-[28px] font-semibold">
        Admin Panel
      </h2>
      <div>
        <Tab.Group>
          <Tab.List className="px-6 bg-white flex items-end">
            <Tab className="px-10 text-black py-3 font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:border-accent-color aria-selected:border-b-2 aria-selected:font-bold">
              User
            </Tab>
            <Tab className="px-10 py-3 text-black font-DM-sans text-[17px] leading-[22px] font-medium focus:outline-none aria-selected:border-accent-color aria-selected:border-b-2 aria-selected:font-bold">
              Doctor
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <DoctorList />
            </Tab.Panel>
            <Tab.Panel>
              <UserList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AdminPanel;
