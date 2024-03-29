import React from "react";
import { Container } from "@mui/material";
import { useAppSelector } from "../../redux/hook";

const UserProfileHeader = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Container>
      <div className="userheader-grid">
        <div className="userheader-card">
          {/* <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          /> */}

          <div className="userheader-card-content">
            <h5>{`${user?.first_name ?? ""} ${user?.last_name}`}</h5>
            <span className="age">34 year</span>
            <div className="metalist">
              <p>
                <span>Email</span> <span>{user?.email ?? ""}</span>
              </p>
              <p>
                <span>Age</span> <span>{user?.age ?? ""}</span>
              </p>
              <p>
                <span>Address</span> <span>{user?.address ?? ""}</span>
              </p>
              <p>
                <span>Gender</span> <span>{user?.gender??''}</span>
              </p>
              <p>
                <span>Dieseses</span> <span>{user?.dieseses??''}</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="userheader-card">
          <div className="metalist">
            <p>
              <span>Gender</span> <span>Male</span>
            </p>
            <p>
              <span>Allergies</span> <span>Honey, Milk</span>
            </p>
            <p>
              <span>Diseases</span> <span>Type A Diabetes</span>
            </p>
          </div>
        </div> */}

        {/* <div className="userheader-card">
          <div className="metalist">
            <p>
              <span>Weight</span> <span>70 KG</span>
            </p>
            <p>
              <span>Blood Pressure</span> <span>120/130</span>
            </p>
            <p>
              <span>Heart rate</span> <span>60 Bpm</span>
            </p>
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default UserProfileHeader;
