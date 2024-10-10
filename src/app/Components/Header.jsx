"use client";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { BsHeart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import LoginForm from "./LoginForm";
import Link from "next/link";
import Offcanvas from "./Offcanvas";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [ifCookie, setIfCookie] = useState(false);

  const router = useRouter();
  let pathName = usePathname();

  useEffect(() => {
    const cookie = Cookies.get("token");
    if (!cookie) {
      // alert("no cookies");
      setShowLogin(true);
      setIfCookie(false);
      router.push("/");
    } else {
      // alert(pathName);
      const account = document.querySelector("#account");
      account.addEventListener("click", () => {
        console.log("From header pathname, route changed.");
        setShowLogin(false);
        setIfCookie(true);
        pathName !== "/account/account-settings"
          ? router.push("./../account/account-settings")
          : "#";
      });
    }
  }, []);

  return (
    <header className="w-full h-[50px] border-b grid grid-cols-[10%_70%_20%] p-[0_30px] justify-between fixed top-0 z-50 bg-white">
      <div>
        <Link href="/">
          <span className="font-extrabold flex h-full items-center justify-center cursor-pointer ">
            Frank and Oak
          </span>
        </Link>
      </div>
      <div>
        <ul className="list-none w-full flex h-full items-center gap-[25px] px-[25px] ">
          <Link href="/shop-now/">
            <li className="text-[#ed2e00] cursor-pointer">Shop now</li>
          </Link>
          {/* <li className=" cursor-pointer">Women</li> */}
          {/* <li className=" cursor-pointer">Men</li> */}
          <Link href="/our-story">
            <li className=" cursor-pointer">Our Story</li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="list-none w-full flex h-full items-center justify-end gap-[25px] px-[20px]">
          <li className="cursor-pointer text-[20px]">
            <GoSearch />
          </li>
          <li className="cursor-pointer text-[20px] relative">
            <VscAccount
              onClick={() => {
                ifCookie ? setShowLogin(false) : setShowLogin(true);
              }}
              id="account"
            />
          </li>
          <li className="cursor-pointer text-[20px]">
            <BsHeart />
          </li>
          <li className="cursor-pointer text-[20px]">
            <IoBagOutline onClick={() => setShowOffcanvas(true)} />
          </li>
        </ul>
      </div>
      {/* Login Modal */}
      <div
        className={
          showLogin
            ? "w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 p-0 m-0 absolute"
            : "hidden"
        }
      >
        <LoginForm close={setShowLogin} />
      </div>
      {/* Offcanvas */}
      <div
        className={
          showOffcanvas
            ? "w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 p-0 m-0 absolute"
            : "hidden"
        }
      >
        <Offcanvas close={setShowOffcanvas} />
      </div>
    </header>
  );
};

export default Header;
