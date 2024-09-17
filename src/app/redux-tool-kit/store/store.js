"use client";

import { configureStore } from "@reduxjs/toolkit";
import slice from "../features/slice";

export const store = () => {
  return configureStore({
    reducer: {
      forgot_password: slice,
    },
  });
};
