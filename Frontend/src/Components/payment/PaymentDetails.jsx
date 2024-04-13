import { Button } from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook"
import { payKhalti } from "../../Api/payment";

const PaymentDetails = () => {
  const {user} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const data = {
    amount: 8000
  }

  const handlePayment = () => {
    dispatch(payKhalti(data))
  }

  if(!user){
    window.location.href = '/login'
  }
  
  return (
    <>
    { user && 
    <div className=" p-10 flex flex-col gap-6 w-full justify-center">
      <div className="w-[400px] rounded-lg border-black border-[1px] p-4">
        <h1 className="!p-0 font-bold">Payment Details</h1>
        <div className="flex flex-col gap-1">
          <p>Name: {user?.first_name??""} {user?.last_name??''}</p>
          <p>Age: 16</p>
          <p>Gender: {user?.gender??""}</p>
          <p>Email: {user?.email??""}</p>
          <p>Amount: Rs. 800</p>
        </div>
      </div>
      <div className="mb-10">
        <Button onClick={handlePayment} style={{ backgroundColor: "#5C2D91" }} variant="contained">
          Pay Via Khalti
        </Button>
      </div>
    </div> 
    
    }
    </>
  );
};

export default PaymentDetails;
