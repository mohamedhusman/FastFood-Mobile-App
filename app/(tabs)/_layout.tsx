import { Redirect, Slot } from "expo-router";
import React from "react";

const _layout = () => {
  const isAUthenticated = false;
  if (!isAUthenticated) return <Redirect href={"/sign-in"} />;
  return <Slot />;
};

export default _layout;
