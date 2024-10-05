"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const Page = () => {
  const [address, setAddress] = useState(true);
  const [addressData, setAddressData] = useState({});

  const handleAddress = async (e) => {
    e.preventDefault();
    const cookie = JSON.parse(Cookies.get("token"));
    const formData = new FormData(e.target);
    const FormEntries = Object.fromEntries(formData.entries());

    await axios
      .post(
        "http://localhost:4000/api/frankandoak-services/address/add-address",
        {
          headers: { authorization: `Bearer ${cookie}` },
          body: JSON.stringify(FormEntries),
        }
      )
      .then((res) => {
        if (res.status === 200) alert("Address Saved");
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred.");
      });
  };

  const fetchAddress = async () => {
    const cookie = JSON.parse(Cookies.get("token"));

    await axios
      .get(
        "http://localhost:4000/api/frankandoak-services/address/read-address",
        {
          headers: { authorization: `Bearer ${cookie}` },
        }
      )
      .then((res) => {
        if (res.status === 200) setAddressData(...res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred.");
      });
  };
  useEffect(() => {
    fetchAddress();
  }, [addressData]);

  return (
    <div className="w-[90%] mx-auto my-[30px]">
      <span className="text-[30px] my-[20px]">Address</span>
      <span
        className="text-[12px] mx-[10px] text-green-400 hover:text-green-500 font-bold cursor-pointer"
        onClick={() => setAddress(false)}
      >
        Add address
      </span>
      {addressData && address ? (
        <div className="w-full my-[20px] text-[14px] ">
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>First Name</span>
            <span>{addressData ? addressData.first_name : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px]">
            <span>Last Name</span>
            <span>{addressData ? addressData.last_name : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>Street address</span>
            <span>
              {addressData ? addressData.street_address : "Add details"}
            </span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>Apartment</span>
            <span>{addressData ? addressData.apartment : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>City</span>
            <span>{addressData ? addressData.city : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>Country</span>
            <span>{addressData ? addressData.country : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>State</span>
            <span>{addressData ? addressData.state : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>Postal Code</span>
            <span>{addressData ? addressData.postal_code : "Add details"}</span>
          </div>
          <div className="w-full grid grid-cols-[1fr_3fr] gap-[10px] my-[10px]">
            <span>Phone Number</span>
            <span>
              {addressData ? addressData.contact_number : "Add details"}
            </span>
          </div>
        </div>
      ) : (
        <form method="post" onSubmit={handleAddress}>
          <div className="my-[10px] w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label
                htmlFor="first_name"
                className="block text-[12px] font-bold"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-[12px] font-bold"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="my-[10px] w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label
                htmlFor="street_address"
                className="block text-[12px] font-bold"
              >
                Street Address
              </label>
              <input
                type="text"
                name="street_address"
                id="street_address"
                min={10}
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="apartment"
                className="block text-[12px] font-bold"
              >
                Apartment (optional)
              </label>
              <input
                type="text"
                name="apartment"
                id="apartment"
                className="w-full p-[10px] border border-black focus:outline-none"
              />
            </div>
          </div>
          <div className="my-[10px] w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="city" className="block text-[12px] font-bold">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-[12px] font-bold">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="my-[10px] w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="state" className="block text-[12px] font-bold">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postal_code"
                className="block text-[12px] font-bold"
              >
                Postal Code/Zip Code
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="my-[10px] w-full">
            <div>
              <label
                htmlFor="contact_number"
                className="block text-[12px] font-bold"
              >
                Phone Number (If there is problem with delivery)
              </label>
              <input
                type="text"
                name="contact_number"
                id="contact_number"
                className="w-full p-[10px] border border-black focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="my-[10px] w-full">
            <div>
              <label
                htmlFor="shipping_address"
                className="mr-[20px] text-[14px] font-bold"
              >
                Make this my default shipping address
              </label>
              <input
                type="checkbox"
                name="shipping_address"
                id="shipping_address"
                value={true}
                className="accent-black cursor-pointer"
              />
            </div>
          </div>
          <div className="my-[10px] w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <button
              type="reset"
              className="h-[30px] bg-black text-white cursor-pointer"
              onClick={() => setAddress(true)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[30px] bg-black text-white cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;
