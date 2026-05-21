import React from "react";
import { motion as Motion } from "motion/react";
import pana from "../../../assets/pana.png";

export default function AuthBrandPanel() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      className="hidden md:flex flex-col items-center justify-center w-full md:w-full lg:w-[45%] md:h-auto lg:h-full max-h-screen text-center box-border shrink-0"
    >
      <h1 className="font-caveat w-full max-w-[600px] text-[30px] md:text-[36px] lg:text-[44px] xl:text-[54px] font-normal leading-[1.1] text-[var(--ui-text)] tracking-[0.14px] text-center mb-4 lg:mb-6">
        Library Management <br className="hidden md:block" /> Sestem
      </h1>

      <div className="w-full max-w-[220px] md:max-w-[320px] lg:max-w-[420px] xl:max-w-[500px] aspect-[585/566] flex items-center justify-center">
        <img
          src={pana}
          alt="Library Illustration"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </Motion.div>
  );
}
