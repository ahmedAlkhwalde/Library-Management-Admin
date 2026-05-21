import React from "react";

export default function InputField({
  name,
  label,
  type = "text",
  placeholder,
  Icon,
  value,
  onChange,
  onBlur,
  error,
  inputClassName = "",
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
        {Icon ? (
          <Icon className="absolute left-3 text-gray-400 !w-[17px] opacity-70" />
        ) : null}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full rounded-[8px] pl-10 pr-4 py-2 md:py-2.5 text-[14px] placeholder:text-[14px] bg-[var(--ui-input-bg)] border-none outline-none ${ringClass} ${inputClassName}`}
        />
      </div>
      {error ? (
        <span id={errorId} className="text-red-500 text-[10px] leading-tight">
          {error}
        </span>
      ) : null}
    </div>
  );
}
