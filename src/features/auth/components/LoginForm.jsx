import React, { useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Email is invalid.";
      case "password":
        return value.length >= 8
          ? ""
          : "Password must be at least 8 characters.";
      default:
        return "";
    }
  };

  const validateAll = (allValues) => {
    const nextErrors = {};
    ["email", "password"].forEach((field) => {
      const message = validateField(field, allValues[field]);
      if (message) nextErrors[field] = message;
    });
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (touched[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value),
        }));
      }
      return next;
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    if (Object.keys(nextErrors).length === 0) {
      // Valid form; no submission behavior defined yet.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 lg:space-y-3.5">
      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="omar@gmail.com"
        Icon={MailOutlineIcon}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ""}
      />

      <PasswordField
        name="password"
        label="Password"
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : ""}
      />

      <button
        type="submit"
        className="w-full bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-hover)] text-white rounded-full py-2.5 lg:py-3 text-[17px] cursor-pointer font-semibold transition-all mt-2 active:scale-[0.98]"
      >
        Sign In
      </button>

    </form>
  );
}
