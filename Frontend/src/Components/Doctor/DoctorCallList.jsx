import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getDoctorList } from "../../Api/admin";

const DoctorCallList = () => {
  const dispatch = useAppDispatch();

  const { token } = useParams();

  const { doctors } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full mt-10 text-center h-full">
      <h1 className="text-[20px] mb-10 text-[#0cc2ea] font-semibold">
        Consult with doctor Online
      </h1>

      <div className="flex flex-col p-10 gap-6">
        {doctors?.length > 0 &&
          doctors.map((item) => {
            return (
              <div
                key={item?.profile_id}
                className="p-4 rounded-2xl flex max-w-[500px] justify-between border-[1px] w-[500px] "
              >
                <div className="flex flex-col gap-2 justify-start items-start">
                  <h2 className="text-[18px] leading-[22px] font-medium">
                    {item?.first_name ?? ""} {item?.last_name ?? ""}
                  </h2>
                  <p className="text-[14px]">
                    Speciality: {item?.speciality || "None"}
                  </p>
                </div>
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  variant="contained"
                  onClick={() =>
                    navigate(`/calling-doctor/${item?.profile_id ?? ""}/${token}`)
                  }
                >
                  Call Now
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorCallList;
