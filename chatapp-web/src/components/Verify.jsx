/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {  setResendOTP, setVerifyAccount } from "../utils/APIRoutes";
export default function Verify() {
 
  const navigate = useNavigate();
  const { UserId } = useParams();
  const [otp, setOTP] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const verifyAccount = async () => {
    if (otp === "") {
      toast.error("Please enter your OTP from email", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setVerifyAccount}/${user._id}`, {
        otp : otp
      });

      if (data.isSet) {
        user.isVerify = data.isSet;
       
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error otp. Please try again.", toastOptions);
      }
    }
  };
  const resendOTP = async () => {
   
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setResendOTP}/${user._id}`, {
        email : user.email
      });

      if (data.isSeted) {
        
        user.otp = data.otpnew
        
     
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        }
  };
  const handleChange =(event)=>{
    setOTP( event.target.value);
  }
  const handleSubmit =(event)=>{
    event.preventDefault();
    verifyAccount()
  }


  const handleResendOtp = () =>{
      resendOTP()
  }

 

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>VERIFY ACCOUNT</h1>
          </div>
          <input
            type="text"
            placeholder="ENTER OTP"
            name="otp"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an otp ?  
            <span onClick={handleResendOtp} className="resend"> Resend otp</span>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .resend{
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }
`;

