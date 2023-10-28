"use client";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function Loader() {
  const [progress, setProgress] = useState(100);

  return (
    <>
      <LoadingBar
        color="#242c3f"
        progress={progress}
        onLoaderFinished={() => setProgress(progress + 90)}
        height={6}
      />
    </>
  );
}
