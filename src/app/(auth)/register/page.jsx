"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Password Validation Item Component
const ValidationItem = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
        isValid
          ? "bg-[#00d4aa] border-[#00d4aa] text-[var(--on-primary)]"
          : "border-[var(--outline-variant)] bg-transparent"
      }`}
    >
      {isValid && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-2.5 h-2.5"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
    <span
      className={`text-sm transition-colors duration-200 ${
        isValid ? "text-[#00d4aa] font-medium" : "text-[var(--outline)]"
      }`}
    >
      {text}
    </span>
  </div>
);

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Validation States
  const hasMinLength = passwordValue.length >= 6;
  const hasNumber = /\d/.test(passwordValue);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);

  const isPasswordValid =
    hasMinLength &&
    hasNumber &&
    hasSpecialChar &&
    hasUppercase &&
    hasLowercase;

  const doPasswordsMatch = passwordValue === confirmPassword && confirmPassword !== "";

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");

    if (password !== confirm) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        role: role,
      });

      if (error) {
        toast.error(error.message || "Signup failed", {
          position: "top-center",
          autoClose: 3000,
        });
        throw new Error(error.message || "Signup failed");
      }

      toast.success("Welcome to TicketHub! Account created successfully 🎉", {
        position: "top-center",
        autoClose: 2000,
      });

      await authClient.signOut();
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(error.message || "Google Auth Error", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--on-surface)] tracking-tight">
          Create your account
        </h2>
        <p className="text-[var(--on-surface-variant)] mt-3 text-sm">
          Join the next generation of travel
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label className="text-[var(--on-surface)] font-medium text-sm">
            Name <span className="text-[var(--tertiary)]">*</span>
          </Label>
          <Input
            name="name"
            placeholder="Enter your full name"
            required
            className='w-full h-11 rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3'
            classNames={{
              input: " text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3",
              inputWrapper: " bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20  h-11 rounded-lg shadow-none",
            }}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label className="text-[var(--on-surface)] font-medium text-sm">
            Email <span className="text-[var(--tertiary)]">*</span>
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
               className='w-full h-11 rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3'
            classNames={{
              input: "text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3",
              inputWrapper: "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 h-11 rounded-lg shadow-none",
            }}
          />
        </div>

        {/* Password Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[var(--on-surface)] font-medium text-sm">
              Password <span className="text-[var(--tertiary)]">*</span>
            </Label>
            <div className="relative">
              <Input
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                  className='w-full h-11 rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3'
                classNames={{
                  input: "text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3 pr-10",
                  inputWrapper: "bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 h-11 rounded-lg shadow-none",
                }}
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-[var(--outline)] hover:text-[var(--primary)] transition-colors"
              >
                {isVisible ? (
                  <Icon icon="heroicons:eye-slash" className="w-5 h-5" />
                ) : (
                  <Icon icon="heroicons:eye" className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[var(--on-surface)] font-medium text-sm">
              Confirm <span className="text-[var(--tertiary)]">*</span>
            </Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full h-11 rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)] hover:border-[var(--primary)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 text-[var(--on-surface)] placeholder:text-[var(--outline)] px-3'
              />
              <button
                type="button"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-[var(--outline)] hover:text-[var(--primary)] transition-colors"
              >
                {isConfirmVisible ? (
                  <Icon icon="heroicons:eye-slash" className="w-5 h-5" />
                ) : (
                  <Icon icon="heroicons:eye" className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Password Validation List */}
        <div className="space-y-2 bg-[var(--surface-container-low)] p-4 rounded-lg border border-[var(--outline-variant)]">
          <ValidationItem isValid={hasMinLength} text="6+ characters" />
          <ValidationItem isValid={hasNumber} text="At least one number" />
          <ValidationItem isValid={hasUppercase} text="One uppercase letter" />
          <ValidationItem isValid={hasLowercase} text="One lowercase letter" />
          <ValidationItem
            isValid={hasSpecialChar}
            text="One special character (!@#$)"
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <Label className="text-[var(--on-surface)] font-medium text-sm">
            I am a...
          </Label>
          <div className="flex rounded-lg overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
                role === "user"
                  ? "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
                  : "bg-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
                role === "vendor"
                  ? "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
                  : "bg-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              Vendor
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isPasswordValid || !doPasswordsMatch}
          className="w-full h-11 bg-[var(--primary-container)] cursor-pointer text-[var(--on-primary-container)] font-semibold rounded-lg hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center w-full">
        <hr className="flex-grow border-t border-[var(--outline-variant)]" />
        <span className="px-4 text-xs font-semibold text-[var(--outline)] uppercase tracking-wider">
          OR
        </span>
        <hr className="flex-grow border-t border-[var(--outline-variant)]" />
      </div>

      {/* Google Button */}
      <Button
        onClick={handleGoogle}
        className="w-full h-11 rounded-full cursor-pointer bg-[var(--primary-fixed)] text-[var(--on-primary-fixed)] font-medium hover:bg-[var(--inverse-surface)] transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
      >
        <Icon icon="devicon:google" className="text-lg" />
        Continue with Google
      </Button>

      {/* Login Link */}
      <div className="text-center mt-6 text-sm">
        <span className="text-[var(--on-surface-variant)]">Already have an account?</span>
        <Link
          href="/login"
          className="font-semibold text-[var(--primary)] hover:text-[var(--tertiary)] transition-colors ml-1"
        >
          Log In
        </Link>
      </div>
    </>
  );
}