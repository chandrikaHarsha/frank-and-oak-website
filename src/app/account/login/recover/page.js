"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
const Page = () => {
  const [otp, setOtp] = useState(false);
  let [timer, setTimer] = useState(60);
  const [password, setPassword] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let otpTimer;
    if (otp && timer > 0) {
      otpTimer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer <= 0) {
      clearInterval(otpTimer);
      setOtp(false);
      setTimer(60);
    }

    return () => clearInterval(otpTimer);
  }, [otp, timer]);

  const handleOTP = async (e) => {
    const email = document.querySelector("#email").value;
    const cookie = JSON.parse(Cookies.get("token"));
    // const otpTimer = setInterval(() => {
    //   setTimer(timer--);
    //   if (timer <= 0) {
    //     clearInterval(otpTimer);
    //     setOtp(false);
    //     setTimer(60);
    //   }
    // }, 1000);
    if (e.target.type === "button") {
      await axios
        .post(
          "http://localhost:4000/api/frankandoak-services/users/forgot-password/generate-otp",
          {
            headers: {
              authorization: `Bearer ${cookie}`,
            },
            body: email,
          }
        )
        .then((res) => {
          if (res.status === 200) alert("otp sent to your email.");
          setOtp(true);
          console.log(e.target.type, "INNER CALL");
          setPassword(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred.");
        });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // alert("Form submitted.");
    const cookie = JSON.parse(Cookies.get("token"));
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    // console.log(formEntries);
    await axios
      .put(
        "http://localhost:4000/api/frankandoak-services/users/update-forgot-password",
        {
          headers: {
            authorization: `Bearer ${cookie}`,
          },
          body: JSON.stringify(formEntries),
        }
      )
      .then((res) => {
        if (res.status === 200) alert("Password Updated");
        console.log(res.data.data);
        setOtp(false);
        setPassword(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred.");
      });
  };

  return (
    <div className="mt-[50px] p-[10px] box-border">
      <form
        method="post"
        className="w-[600px] mx-auto my-[10px] p-[20px] box-border"
        onSubmit={handleForgotPassword}
      >
        <h1 className="text-[30px] my-[5px]">Forgot Password?</h1>
        <span className="text-[14px] my-[15px] leading-[1.3em] tracking-tighter">
          Please enter your email below and we will send you an OTP to reset
          your password.
        </span>
        <div>
          <label
            htmlFor="email"
            className="block text-[13px] my-[10px] font-[600] "
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your registered email"
            className="border border-black focus:outline-none text-[14px] w-full p-[10px]"
          />
        </div>
        <div className={password ? "my-[10px] relative" : "hidden"}>
          <span
            className="text-[12px] absolute top-[35px] right-[10px] cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </span>
          <label htmlFor="password" className="block text-[14px]">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
          />
        </div>
        <div className={otp ? "w-full relative" : "hidden"}>
          <span
            className={
              timer === 0
                ? "hidden"
                : "text-red-500 text-[12px] absolute top-[15px] bg-white"
            }
          >
            {timer}
          </span>
          <label
            htmlFor="otp"
            className="block text-[13px] mt-[10px] font-[600]"
          >
            OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP"
            className="border border-black focus:outline-none text-[14px] w-full p-[10px]"
          />
        </div>
        <button
          type={otp ? "submit" : "button"}
          className="bg-black text-white h-[40px] w-[150px] my-[20px] text-[14px]"
          onClick={handleOTP}
        >
          {otp ? "Submit" : "Generate OTP"}
        </button>
      </form>
    </div>
  );
};

export default Page;
