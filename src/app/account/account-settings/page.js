"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Page = () => {
  const [userInfoEditBtn, setUserInfoEditBtn] = useState(false);
  const [userPasswordBtn, setUserPasswordBtn] = useState(false);
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [cf_show, set_cf_Show] = useState(false);

  const handleUserDetails = async () => {
    const cookie = Cookies.get("token");
    const token = JSON.parse(cookie);
    await axios
      .get("http://localhost:4000/api/frankandoak-services/users/read-user", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) setUserData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleUserInfoUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    const cookie = Cookies.get("token");
    const token = JSON.parse(cookie);
    await axios
      .put(
        "http://localhost:4000/api/frankandoak-services/users/update-user-data",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(formDataEntries),
        }
      )
      .then((res) => {
        if (res.status === 200) alert("information updated.");
        console.log("Updated: ", res.data.data);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataEntries = Object.fromEntries(formData.entries());
    const cookie = Cookies.get("token");
    const token = JSON.parse(cookie);
    await axios
      .put(
        "http://localhost:4000/api/frankandoak-services/users/update-password",
        {
          headers: { authorization: `Bearer ${token}` },
          body: JSON.stringify(formDataEntries),
        }
      )
      .then((res) => {
        if (res.status === 200) alert("Password Updated.");
        console.log(res.data.data);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  useEffect(() => {
    handleUserDetails();
  }, [userData]);
  return (
    <>
      <div className="w-[90%] mx-auto my-[30px] ">
        <span className="text-[20px] ">Account Settings</span>
        <span
          className="text-green-400 hover:text-green-500 hover:font-bold cursor-pointer mx-[10px] text-[12px]"
          onClick={() => setUserInfoEditBtn(true)}
        >
          Edit
        </span>
        {userInfoEditBtn ? (
          <form
            method="post"
            className="my-[30px]"
            onSubmit={handleUserInfoUpdate}
          >
            <div className="my-[10px]">
              <label htmlFor="first_name" className="block text-[14px]">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={(e) => {
                  setUserData({ ...userData, first_name: e.target.value });
                }}
                className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
              />
            </div>
            <div className="my-[10px]">
              <label htmlFor="last_name" className="block text-[14px]">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={(e) => {
                  setUserData({ ...userData, last_name: e.target.value });
                }}
                className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
              />
            </div>

            <div className="my-[10px]">
              <label htmlFor="email" className="block text-[14px]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
              />
            </div>
            <div className="my-[10px]">
              <label htmlFor="shop_for" className="block text-[14px]">
                I shop For
              </label>
              <input
                type="radio"
                id="shop_for"
                name="shop_for"
                onChange={(e) => {
                  setUserData({ ...userData, shop_for: e.target.value });
                }}
                value="Men"
                className="cursor pointer accent-black"
              />
              <span className="mx-[10px]">Men</span>
              <input
                type="radio"
                id="shop_for"
                name="shop_for"
                value="Women"
                className="cursor pointer accent-black"
              />
              <span className="mx-[10px]">Women</span>
              <input
                type="radio"
                id="shop_for"
                name="shop_for"
                value="All"
                className="cursor pointer accent-black"
              />
              <span className="mx-[10px]">All</span>
            </div>
            <button
              type="button"
              className="bg-black text-white w-[200px] mx-[10px] h-[30px] my-[10px]"
              onClick={() => setUserInfoEditBtn(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white w-[200px] mx-[10px] h-[30px] my-[10px]"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="w-[50%] my-[30px] p-[10px]">
            <div className="w-full grid grid-cols-[1fr_3fr] my-[10px]">
              <span className="text-[14px]">First Name</span>
              <span className="text-[14px]">{userData.first_name}</span>
            </div>
            <div className="w-full grid grid-cols-[1fr_3fr] my-[10px]">
              <span className="text-[14px]">Last Name</span>
              <span className="text-[14px]">{userData.last_name}</span>
            </div>
            <div className="w-full grid grid-cols-[1fr_3fr] my-[10px]">
              <span className="text-[14px]">Email</span>
              <span className="text-[14px]">{userData.email}</span>
            </div>
            <div className="w-full grid grid-cols-[1fr_3fr] my-[10px]">
              <span className="text-[14px]">I shop for</span>
              <span className="text-[14px]">{userData.shop_for}</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-[90%] mx-auto my-[30px] ">
        <span className="text-[20px] ">Password</span>
        <span
          className="text-green-400 hover:text-green-500 hover:font-bold cursor-pointer mx-[10px] text-[12px]"
          onClick={() => setUserPasswordBtn(true)}
        >
          Edit
        </span>
        {userPasswordBtn ? (
          <form
            method="post"
            className="my-[30px]"
            onSubmit={handlePasswordUpdate}
          >
            <div className="my-[10px] relative">
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
            <div className="my-[10px] relative">
              <span
                className="text-[12px] absolute top-[35px] right-[10px] cursor-pointer"
                onClick={() => set_cf_Show(!cf_show)}
              >
                {cf_show ? "Hide" : "Show"}
              </span>
              <label htmlFor="confirm_password" className="block text-[14px]">
                Confirm Password
              </label>
              <input
                type={cf_show ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                placeholder="Enter new password"
                className="p-[10px] focus:outline-none w-full border border-black text-[14px]"
              />
            </div>
            <button
              type="button"
              className="bg-black text-white w-[200px] mx-[10px] h-[30px] my-[10px]"
              onClick={() => setUserPasswordBtn(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white w-[200px] mx-[10px] h-[30px] my-[10px]"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="w-[50%] my-[30px] p-[10px]">
            <div className="w-full grid grid-cols-[1fr_3fr] my-[10px]">
              <span className="text-[14px]">Password</span>
              <span className="text-[14px]">*********</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
