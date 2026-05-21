import React from "react";
import AuthBackgroundOrbs from "../features/auth/components/AuthBackgroundOrbs";
import AuthBrandPanel from "../features/auth/components/AuthBrandPanel";
import AuthCard from "../features/auth/components/AuthCard";
import AuthCardHeader from "../features/auth/components/AuthCardHeader";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-[100dvh] md:h-screen w-full flex items-center md:items-center justify-center md:justify-center focus-within:items-start focus-within:justify-start md:focus-within:items-center md:focus-within:justify-center overflow-y-auto md:overflow-hidden select-none bg-[var(--ui-bg)] relative box-border px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-4">
      <AuthBackgroundOrbs />

      <div className="w-full max-w-[1440px] h-auto md:h-full min-h-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 md:gap-10 lg:gap-6 relative z-10 box-border">
        <AuthBrandPanel />

        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end items-center box-border h-auto md:h-full">
          <AuthCard>
            <AuthCardHeader />
            <LoginForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
