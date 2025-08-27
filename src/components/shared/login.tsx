"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Mail,
  Lock,
  Phone,
  User,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LoginPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"login" | "register" | "otp">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    otp: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      // Reset form
      setFormData({ email: "", password: "", name: "", phone: "", otp: "" });
      setStep("login");
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setIsRegistered(true);
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      // Reset form
      setFormData({ email: "", password: "", name: "", phone: "", otp: "" });
      setStep("login");
    }, 1500);
  };

  const handleResendOTP = () => {
    // Simulate OTP resend
    console.log("Resending OTP...");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full">
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {step === "login" && "Welcome Back"}
              {step === "register" && "Create Account"}
              {step === "otp" && "Verify OTP"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {step === "login" && "Sign in to your account"}
              {step === "register" && "Join us today"}
              {step === "otp" && "Enter the code sent to your email"}
            </p>
          </div>

          {/* Back Button */}
          {(step === "register" || step === "otp") && (
            <button
              onClick={() => setStep("login")}
              className="flex items-center text-sm text-blue-600 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </button>
          )}

          {/* Login Form */}
          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("register")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Don&apos;t have an account? Register
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="register-password"
                  className="text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          )}

          {/* OTP Verification Form */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-4">
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <span className="font-medium">{formData.email}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="text-center text-lg font-mono tracking-widest"
                  value={formData.otp}
                  onChange={handleInputChange}
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Didn&apos;t receive code? Resend
                </button>
              </div>
            </form>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoginPopover;
