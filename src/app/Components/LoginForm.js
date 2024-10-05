"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaHeart, FaTag } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { BiLogoFacebook } from "react-icons/bi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const LoginForm = ({ close }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [otp, setOtp] = useState(false);
  const [forgotPasswordBtn, setForgotPasswordBtn] = useState(false);
  const [formData, setFormData] = useState({});
  const [loginForm, setLoginForm] = useState({});
  const [errors, setErrors] = useState({});
  let [timer, setTimer] = useState(60);
  const Router = useRouter();

  const handleIFForgotPassword = (e) => {
    e.preventDefault();
    Router.push("../account/login/recover");
    close(false);
  };

  const handleFormValidation = () => {
    const errorObj = {};

    const namePattern = /^[a-zA-z\u00E0-\u00FC\s'-]{2,30}$/;

    if (!formData.first_name || !namePattern.test(formData.first_name)) {
      errorObj.first_name = "Please enter your first name";
    }
    if (!formData.last_name || !namePattern.test(formData.last_name)) {
      errorObj.last_name = "Please enter your last name";
    }
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      errorObj.email = "Please enter a valid email.";
    }

    const passwordPattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!formData.password || !passwordPattern.test(formData.password)) {
      errorObj.password =
        "Try to select a different password with minimum 8 characters length and it should have at least one uppercase & lowercase letter, one digit and a special character.";
    }
    setErrors(errorObj);
    return Object.keys(errorObj).length === 0;
  };

  const generateOTP = async (e) => {
    const ifValid = handleFormValidation();
    if (ifValid) {
      const registrationForm = document.querySelector("#registerUser");
      const email = registrationForm.email.value;
      const interval = setInterval(() => {
        setTimer(--timer);
        if (timer <= 0) {
          clearInterval(interval);
          setOtp(false);
          setTimer(60);
        }
      }, 1000);
      // console.log(email);
      if (e.target.type === "button") {
        await axios
          .post(
            "http://localhost:4000/api/frankandoak-services/users/generate-otp",
            { email: email }
          )
          .then((res) => {
            if (res.status === 200) alert("otp sent to your email.");
            setOtp(true);
          })
          .catch((error) => {
            console.log(error);
            alert("Error occurred.");
          });
      }
    }
  };
  const handleUserRegistration = async (e) => {
    e.preventDefault();
    console.log(e.target);
    await axios
      .post(
        "http://localhost:4000/api/frankandoak-services/users/user-registration",
        e.target
      )
      .then((res) => {
        if (res.status === 200) alert(res.data.message);
        // console.log(res.data.data);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          otp: "",
        });
        e.target.reset();
        setSignUp(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred. Try after some time.");
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorObj = {};
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!loginForm.email || !emailPattern.test(loginForm.email)) {
      errorObj.email = "Please enter a valid email.";
    }

    const passwordPattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!loginForm.password || !passwordPattern.test(loginForm.password)) {
      errorObj.password =
        "Try to select a different password with minimum 8 characters length and it should have at least one uppercase & lowercase letter, one digit and a special character.";
    }
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      await axios
        .post(
          "http://localhost:4000/api/frankandoak-services/users/user-login",
          e.target
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Login successful");
            Cookies.set("token", JSON.stringify(res.data.auth), { expires: 7 });
          }
        })
        .catch((error) => {
          alert("Error Occurred.");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/account/login/recover") {
      setForgotPasswordBtn(true);
    } else {
      setForgotPasswordBtn(false);
    }
  }, []);

  return (
    <div className="w-[600px]  p-[30px] h-[650px] bg-white absolute top-[20px] left-[50%] translate-x-[-50%] overflow-y-scroll">
      <div className="w-[95%] p-[10px] box-border bg-[#f9f9f9] mx-auto">
        <span
          className="absolute  top-[8px] right-[20px] text-[20px] cursor-pointer"
          onClick={() => close(false)}
        >
          X
        </span>
        <span className="block text-[25px] text-center">Welcome Back!</span>
        <span className="block text-center text-[14px]">
          Log in to enjoy your perks
        </span>
        <ul className="list-none flex w-full my-[50px] gap-[30px] ">
          <li className="w-full grid grid-flow-row place-content-center gap-[15px]">
            <span className="block mx-auto">
              {/* <Image
              src="/favicon.ico"
              alt="frank and oak"
              width={20}
              height={20}
              className="text-center"
            /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <g clip-path="url(#clip0_2406_20469)">
                  <path
                    d="M18.9397 16.0898C18.9397 15.7398 18.8797 15.3898 18.7697 15.0498C18.7397 14.9398 18.6997 14.8298 18.6497 14.7298C18.3397 13.9998 17.7997 13.3998 17.1097 13.0298C16.9097 12.9298 16.7097 12.8398 16.4897 12.7798C16.2697 12.7098 16.0497 12.6698 15.8197 12.6498C15.5897 12.6298 15.3497 12.6298 15.1197 12.6498C14.8897 12.6798 14.6697 12.7198 14.4597 12.7998C14.3497 12.8398 14.2497 12.8798 14.1497 12.9198C13.7097 13.1098 13.3197 13.3998 12.9997 13.7598C12.6797 14.1198 12.4297 14.5398 12.2797 15.0098C12.1297 15.4698 12.0697 15.9598 12.1097 16.4498C12.1497 16.9398 12.2897 17.4098 12.5297 17.8298C12.5497 17.8598 12.5697 17.8998 12.5897 17.9298C12.6497 18.0198 12.7097 18.1198 12.7697 18.1998C13.1997 18.7898 13.7997 19.2298 14.4897 19.4598C15.1797 19.6798 15.9197 19.6798 16.5997 19.4398C17.2797 19.2098 17.8797 18.7598 18.2997 18.1498C18.7197 17.5498 18.9397 16.8298 18.9297 16.0898V16.0698L18.9397 16.0898Z"
                    fill="black"
                  ></path>
                  <path
                    d="M8.08 3.31982L0 6.02982L5.66 23.6598C10.35 19.3498 11.28 11.8198 8.08 3.31982Z"
                    fill="black"
                  ></path>
                  <path
                    d="M21.8598 0.000234375L11.2598 0.150234C11.3498 6.14023 16.1598 10.9202 22.0198 10.8302L21.8698 -0.00976562L21.8598 0.000234375Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_2406_20469">
                    <rect width="22.02" height="23.66" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className="text-[14px] text-center">
              Frank&apos;s Club Earn points, get rewards
            </span>
          </li>
          <li className="w-full grid grid-flow-row place-content-center gap-[20px]">
            <span>
              <FaHeart className="block mx-auto text-[20px]" />
            </span>
            <span className="text-[14px] text-center">
              Wishlist Save your favourites
            </span>
          </li>
          <li className="w-full grid grid-flow-row place-content-center gap-[20px]">
            <span>
              <FaTag className="block mx-auto text-[20px]" />
            </span>
            <span className="text-[14px] text-center">
              Early access Exclusive sale perks
            </span>
          </li>
        </ul>
      </div>
      {/* Login Form */}
      <div className="w-[95%] my-[20px]">
        {signUp ? (
          <div className="w-full p-[15px]">
            <div className="w-[95%] mx-auto border-t-[1px] mt-[20px] relative">
              <span className="text-[12px] absolute top-[-12px] left-[50%] translate-x-[-50%] bg-white w-[250px] text-center">
                <strong>Already have an account?</strong>{" "}
                <span
                  className="ml-[10px] border-b-[1px] border-black cursor-pointer"
                  onClick={() => setSignUp(false)}
                >
                  Log in <FaArrowRight className="inline-block" />
                </span>
              </span>
            </div>
            <form
              method="post"
              className="my-[30px] relative"
              id="registerUser"
              onSubmit={handleUserRegistration}
            >
              <div className="grid grid-cols-[2fr_2fr] gap-[20px] my-[10px]">
                <div className="relative">
                  <span
                    className={
                      errors.first_name
                        ? "absolute top-[-10px] text-red-500 bg-white font-bold text-[10px]"
                        : "hidden"
                    }
                  >
                    {errors.first_name}
                  </span>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={(e) => {
                      setFormData({ ...formData, first_name: e.target.value });
                    }}
                    placeholder="First Name"
                    className="p-[10px] focus:outline-none w-full border border-black text-[14px] "
                  />
                </div>
                <div className="relative">
                  <span
                    className={
                      errors.last_name
                        ? "absolute top-[-10px] text-red-500 bg-white font-bold text-[10px]"
                        : "hidden"
                    }
                  >
                    {errors.last_name}
                  </span>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={(e) => {
                      setFormData({ ...formData, last_name: e.target.value });
                    }}
                    placeholder="Last Name"
                    className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
                  />
                </div>
              </div>
              <div className="relative">
                <span
                  className={
                    errors.email
                      ? "absolute text-red-500 bg-white font-bold text-[10px]"
                      : "hidden"
                  }
                >
                  {errors.email}
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  placeholder="Email Address"
                  className="p-[10px] focus:outline-none w-full border border-black text-[14px] my-[10px]"
                />
              </div>
              <div className="w-full my-[10px] relative">
                <span
                  className={
                    errors.password
                      ? "absolute top-[-20px] block text-red-500 bg-white font-bold text-[10px]"
                      : "hidden"
                  }
                >
                  {errors.password}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  placeholder="Password should be at least 8 characters long"
                  className="p-[10px] focus:outline-none w-full border border-black text-[14px] my-[10px] "
                />
                <span
                  className="absolute top-[20px] font-[500] right-[30px] cursor-pointer text-[12px]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <div className="flex gap-[20px] my-[15px] text-[12px]">
                <label htmlFor="gender" className="mr-[20px]">
                  I shop for
                </label>
                <input
                  type="radio"
                  name="shop_for"
                  id="gender"
                  value="men"
                  className="accent-slate-800 cursor-pointer"
                />
                <span>Men</span>
                <input
                  type="radio"
                  name="shop_for"
                  id="gender"
                  value="women"
                  className="accent-slate-800 cursor-pointer"
                />
                <span>Women</span>
                <input
                  type="radio"
                  name="shop_for"
                  value="all"
                  id="gender"
                  className="accent-slate-800 cursor-pointer"
                />
                <span>All</span>
              </div>
              <div className="flex gap-[20px] my-[30px] text-[12px] align-middle justify-between">
                <input
                  type="checkbox"
                  name="newsletter_subscription"
                  value={true}
                  className="accent-slate-800 cursor-pointer mr-[20px]"
                />
                <span>
                  <strong>Yes,</strong> sign me up to the Frank And Oak
                  newsletter to never miss out on product launches and exclusive
                  promotions.
                </span>
              </div>
              <div className={otp ? "relative" : "hidden"}>
                <span
                  className={
                    timer === 0
                      ? "hidden"
                      : "absolute text-red-500 bg-white font-bold text-[10px]"
                  }
                >
                  {timer}
                </span>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={(e) => {
                    setFormData({ ...formData, otp: e.target.value });
                  }}
                  placeholder="Enter OTP"
                  className="p-[10px] focus:outline-none w-full border border-black text-[14px] my-[10px]"
                />
              </div>
              <button
                type={otp ? "submit" : "button"}
                className="w-full h-[40px] bg-black text-white"
                onClick={generateOTP}
              >
                {otp ? "User Registration" : "Generate OTP"}
              </button>
            </form>
          </div>
        ) : (
          <form
            method="post"
            className="p-[10px] flex flex-col gap-[20px] relative"
            onSubmit={handleLogin}
          >
            <div className="relative">
              <span
                className={
                  errors.email
                    ? "absolute top-[-10px] text-red-500 bg-white font-bold text-[10px]"
                    : "hidden"
                }
              >
                {errors.email}
              </span>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                placeholder="Email Address"
                className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
              />
            </div>

            <div className="w-full my-[10px] relative">
              <span
                className={
                  errors.password
                    ? "absolute top-[-20px] text-red-500 bg-white font-bold text-[10px] block "
                    : "hidden"
                }
              >
                {errors.password}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                placeholder="Password"
                className="p-[10px] focus:outline-none w-full border border-black text-[14px] my-[10px]"
              />
              <span
                className="absolute top-[20px] font-[500] right-[30px] cursor-pointer text-[12px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button
              type="button"
              className={`underline font-[500] text-[14px] w-[130px] ${
                forgotPasswordBtn ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={forgotPasswordBtn}
              onClick={(e) => handleIFForgotPassword(e)}
            >
              Forgot Password?
            </button>
            <button className="w-full h-[40px] bg-black text-white">
              Log In
            </button>
          </form>
        )}

        <div className="w-[95%] mx-auto border-t-[1px] mt-[20px] relative">
          <span className="text-[12px] absolute top-[-12px] left-[50%] translate-x-[-50%] bg-white w-[80px] text-center">
            Social login
          </span>
          <div className="w-full flex gap-[20px] p-[20px]">
            <button className="border border-black h-[40px] w-[50%] text-[14px] font-[500] grid grid-cols-[auto_3fr] place-content-center px-[10px]">
              <BiLogoFacebook className=" text-[20px]" />

              <span>Sign in with Facebook</span>
            </button>
            <button className="border border-black h-[40px] w-[50%] text-[14px] font-[500] grid grid-cols-[auto_3fr] place-content-center px-[10px]">
              <SiGoogle className="text-[18px]" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
        <div className="w-[95%] mx-auto border-t-[1px] my-[30px] relative mb-[50px] ">
          <span className="block text-[12px] absolute top-[-12px] left-[50%] translate-x-[-50%] bg-white text-center">
            {signUp ? (
              <span className="text-[10px] w-full">
                By joining, you agree to Frank And Oak’s Terms & Conditions and
                Privacy Policy and to receive Frank And Oak’s electronic
                communications.
              </span>
            ) : (
              "Create an account"
            )}
          </span>
          <span
            className={
              signUp ? "hidden" : "text-[12px] text-center block my-[20px]"
            }
          >
            <strong>Don&apos;t have an account</strong>{" "}
            <span
              className="border-b-[1px] border-black ml-[10px] cursor-pointer"
              onClick={() => setSignUp(true)}
            >
              {" "}
              Sign up <FaArrowRight className="inline-block" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
