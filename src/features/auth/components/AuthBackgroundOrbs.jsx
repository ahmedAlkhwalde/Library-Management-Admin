import React from "react";

export default function AuthBackgroundOrbs() {
  return (
    <div className="hidden md:block">
      <div className="absolute top-[-122px] right-[-100px] w-[384px] h-[384px] rounded-full bg-purple-200 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] rounded-full bg-purple-200 blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-purple-200 blur-[100px] pointer-events-none z-0"></div>
    </div>
  );
}
