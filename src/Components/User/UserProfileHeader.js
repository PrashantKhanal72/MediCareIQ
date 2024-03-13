import React from "react";
import { Avatar, Card, Container, CardContent, Stack } from "@mui/material";

const UserProfileHeader = () => {
  return (
    <Container>
      <div className="userheader-grid">
        <div className="userheader-card">
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          <div className="userheader-card-content">
            <h5>Rajesh Sharma</h5>
            <span className="age">34 year</span>
            <div className="metalist">
              <p>
                <span>Email</span> <span>sharmarajesh@gmail.com</span>
              </p>
              <p>
                <span>Address</span> <span>Lokanthali, Bhaktapur</span>
              </p>
              <p>
                <span>Phone</span> <span>98163298362</span>
              </p>
            </div>
          </div>
        </div>

        <div className="userheader-card">
          <div className="metalist">
            <p>
              <span>Blood type</span> <span>A+ve</span>
            </p>
            <p>
              <span>Allergies</span> <span>Honey, Milk</span>
            </p>
            <p>
              <span>Diseases</span> <span>Type A Diabetes</span>
            </p>
          </div>
        </div>

        <div className="userheader-card">
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
        </div>
      </div>
    </Container>
  );
};

export default UserProfileHeader;
