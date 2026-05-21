import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import AppSnackbar from "../../../components/AppSnackbar";
import { useLoginMutation } from "../services/authService";
import { setLoginSuccess } from "../store/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const openSnackbar = (message, variant = "success") => {
    setSnackbar({ open: true, message, variant });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Login failed.";

  const extractToken = (data) =>
        data?.token || data?.access_token || data?.data?.token || null;;

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
      loginMutation.mutate(values, {
        onSuccess: (data) => {
          const token = extractToken(data);
          if (!token) {
            openSnackbar("Login response is missing a token.", "error");
            return;
          }
          const user = data?.user || data?.data?.user || null;
          dispatch(setLoginSuccess({ user, token }));
          navigate("/app/main-page", {
            replace: true,
            state: {
              snackbar: {
                message: "Logged in successfully.",
                variant: "success",
              },
            },
          });
        },
        onError: (error) => {
          openSnackbar(getErrorMessage(error), "error");
        },
      });
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
        disabled={loginMutation.isPending}
        aria-busy={loginMutation.isPending}
        className="w-full bg-(--ui-primary) hover:bg-(--ui-primary-hover) text-white rounded-full py-2.5 lg:py-3 text-[17px] cursor-pointer font-semibold transition-all mt-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
      >
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </button>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={closeSnackbar}
      />
    </form>
  );
}
