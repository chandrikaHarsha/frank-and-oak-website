"use client";
import StoreProvider from "../redux-tool-kit/StoreProvider";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function RootLayout({ children }) {
  const checkPath = usePathname();
  // console.log(checkPath);
  return (
    <html>
      <body>
        <StoreProvider>
          <Header />
          <div className="w-full grid grid-cols-[1fr_3fr] mt-[50px] min-h-[70vh] gap-[20px]">
            <div>
              <ul className="list-none border w-[90%] mx-auto p-[16px] box-border shadow-md my-[100px] bg-[#ebecee] rounded-md flex flex-col gap-[20px]">
                <Link
                  href={
                    checkPath !== "/account/account-settings"
                      ? "./account-settings/"
                      : "#"
                  }
                >
                  <li className="cursor-pointer hover:font-[600] text-[16px]">
                    Account Settings
                  </li>
                </Link>
                <Link
                  href={checkPath !== "/account/address" ? "./address/" : "#"}
                >
                  <li className="cursor-pointer hover:font-[600] text-[16px]">
                    Address Book
                  </li>
                </Link>
                <li className="cursor-pointer hover:font-[600] text-[16px]">
                  Orders
                </li>
                <li className="cursor-pointer text-[16px]">
                  <span className="block hover:font-[600]">Wishlist</span>
                </li>
                <Link
                  href={
                    checkPath !== "/account/login/recover"
                      ? "./login/recover/"
                      : "#"
                  }
                >
                  <li className="cursor-pointer hover:font-[600] text-[16px]">
                    Forgot Password
                  </li>
                </Link>
                <li
                  className="cursor-pointer hover:font-[600] text-[16px]"
                  onClick={() => {
                    const cookie = Cookies.remove("token");
                  }}
                >
                  Log out
                </li>
              </ul>
            </div>
            <div>{children}</div>
          </div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
