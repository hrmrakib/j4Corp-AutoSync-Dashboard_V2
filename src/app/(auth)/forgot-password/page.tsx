"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send the reset email here
      console.log("Password reset email sent to:", email);

      // Redirect to a success page or show success message
      alert("Password reset link has been sent to your email!");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrors({ email: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className='absolute inset-0 top-0 left-0 w-full h-full bg-black opacity-30'></div>

      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-lg p-8 relative'>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className='absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-[#030712]' />
          </button>

          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-[#030712] mb-2'>
              Forget Password
            </h1>
            <p className='text-[#030712] text-sm'>
              Please enter your email address to reset your account password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-[#030712] mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  placeholder='Enter your email'
                  className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#030712] focus:ring-[#030712] ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full h-12 bg-[#030712] hover:bg-[#030712] text-white font-medium rounded-lg transition-colors'
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className='text-center mt-6'>
            <p className='text-[#030712] text-sm'>
              Already have an account?{" "}
              <Link
                href='/signin'
                className='text-[#030712] hover:text-[#030712] font-medium transition-colors'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
