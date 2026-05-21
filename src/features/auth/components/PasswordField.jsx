import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function PasswordField({
  name,
  label,
  show,
  onToggle,
  value,
  onChange,
  onBlur,
  error,
}) {
  const errorId = error ? `${name}-error` : undefined;
  const ringClass = error
    ? "ring-1 ring-red-400 focus:ring-red-400"
    : "focus:ring-1 focus:ring-purple-400";

  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-[var(--ui-text-label)] text-[10px] font-bold uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        <LockOutlinedIcon className="absolute left-3 text-gray-400 !w-[17px] opacity-70" />
        <input
          name={name}
          type={show ? "text" : "password"}
          placeholder="************"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full rounded-[8px] pl-10 pr-10 py-2 md:py-2.5 text-[14px] placeholder:text-[14px] bg-[var(--ui-input-bg)] border-none outline-none ${ringClass}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 text-gray-400 hover:text-purple-600"
        >
          {show ? (
            <VisibilityOffOutlinedIcon className="!w-[17px]" />
          ) : (
            <VisibilityOutlinedIcon className="!w-[17px]" />
          )}
        </button>
      </div>
      {error ? (
        <span id={errorId} className="text-red-500 text-[10px] leading-tight">
          {error}
        </span>
      ) : null}
    </div>
  );
}
