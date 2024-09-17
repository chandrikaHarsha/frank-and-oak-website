"use client";

import { createSlice } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";

const initialState = {
  value: false,
};

export const slice = createSlice({
  name: "frankAndOakSlices",
  initialState,
  reducers: {
    forgotPassword: (state) => {
      console.log(state);
    },
  },
});

export const { forgotPassword } = slice.actions;
export default slice.reducer;
