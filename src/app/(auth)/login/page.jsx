"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to redirect based on role from session
  const redirectToDashboard = async () => {
    // Fetch the session to get the user role
    const { data: sessionData } = await authClient.getSession();
    const userRole = sessionData?.user?.role;

    if (userRole === "vendor") {
      router.push("/vendor/dashboard");
    } else if (userRole === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard"); // or "/" for regular users
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      toast.success("Welcome back! 🎉", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect based on role from session
      await redirectToDashboard();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid email or password", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Will be handled by middleware
      });
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(error.message || "Google Auth Error", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setLoading(true);
    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      const { error } = await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      toast.success("Demo login successful! 🎫", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect based on role from session
      await redirectToDashboard();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Demo login failed", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div className="w-full max-w-[580px]">
        
        

        {/* Main Form Card */}
        <div className="bg-[#231d2d] border border-[#4d4354] rounded-xl p-8 sm:p-10 shadow-2xl shadow-black/50">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-[#ddb7ff] text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-[#cfc2d6] text-sm">
              Please enter your details to sign in
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label className="text-[#eadef5] font-medium text-sm">
                Email
              </Label>
              <Input
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 bg-[#1f1929] border border-[#4d4354] rounded-lg text-[#eadef5] placeholder:text-[#988d9f] focus:border-[#b76dff] focus:outline-none px-3"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[#eadef5] font-medium text-sm">
                  Password
                </Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-[#ddb7ff] hover:text-[#f3aeff] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 bg-[#1f1929] border border-[#4d4354] rounded-lg text-[#eadef5] placeholder:text-[#988d9f] focus:border-[#b76dff] focus:outline-none px-3"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#988d9f] hover:text-[#ddb7ff] transition-colors"
                >
                  {isVisible ? (
                    <Icon icon="heroicons:eye-slash" className="w-5 h-5" />
                  ) : (
                    <Icon icon="heroicons:eye" className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#b76dff] text-[#161020] font-semibold rounded-lg hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Log In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center w-full">
            <hr className="flex-grow border-t border-[#4d4354]" />
            <span className="px-4 text-xs font-semibold text-[#988d9f] uppercase tracking-wider">
              OR
            </span>
            <hr className="flex-grow border-t border-[#4d4354]" />
          </div>

          {/* Google Button */}
          <Button
            onClick={handleGoogle}
            className="w-full h-11 rounded-full bg-[#f0dbff] text-[#161020] font-medium hover:bg-[#eadef5] transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <Icon icon="devicon:google" className="text-lg" />
            Continue with Google
          </Button>

          {/* Demo Accounts Section */}
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <span className="text-xs text-[#988d9f] uppercase tracking-wider">
                Demo Accounts
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("vendor20053@gmail.com", "Vendor20053@gmail.com")}
                disabled={loading}
                className="px-4 py-2.5 bg-[#1f1929] border border-[#4d4354] rounded-lg text-sm font-medium text-[#cfc2d6] hover:border-[#b76dff] hover:text-[#ddb7ff] transition-all duration-200 disabled:opacity-50"
              >
                Demo Vendor
              </button>
              
              <button
                type="button"
                onClick={() => handleDemoLogin("admin20053@gmail.com", "Admin20053@gmail.com")}
                disabled={loading}
                className="px-4 py-2.5 bg-[#1f1929] border border-[#4d4354] rounded-lg text-sm font-medium text-[#cfc2d6] hover:border-[#b76dff] hover:text-[#ddb7ff] transition-all duration-200 disabled:opacity-50"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6 text-sm">
            <span className="text-[#cfc2d6]">
              Don't have an account?
            </span>
            <Link
              href="/register"
              className="font-semibold text-[#ddb7ff] hover:text-[#f3aeff] transition-colors ml-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}