"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; form?: string }>({});
  const router = useRouter();
  const [forgotPasswordMutation] = useForgotPasswordMutation();

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
    setErrors({}); // Clear previous errors

    try {
      // Execute the mutation with the exact body format: { "email": "user@example.com" }
      await forgotPasswordMutation({ email }).unwrap();

      // Redirect to verify-otp page and pass the email via query parameter
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error("Error sending reset email:", error);
      setErrors({
        form:
          error?.data?.message ||
          "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className='absolute inset-0 top-0 left-0 w-full h-full bg-black opacity-30'></div>

      <div className='w-full max-w-md relative'>
        <div className='bg-white rounded-2xl shadow-lg p-8 relative'>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className='absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-[#030712]' />
          </button>

          {/* Header */}
          <div className='text-center mb-8 mt-4'>
            <h1 className='text-2xl font-bold text-[#030712] mb-2'>
              Forget Password
            </h1>
            <p className='text-[#030712] text-sm'>
              Please enter your email address to reset your account password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* General API Error Message */}
            {errors.form && (
              <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200'>
                {errors.form}
              </div>
            )}

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
                    if (errors.email || errors.form) {
                      setErrors({});
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
              className='w-full h-12 bg-[#030712] hover:bg-[#030712]/90 text-white font-medium rounded-lg transition-colors'
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
                className='text-[#030712] hover:text-gray-600 font-bold transition-colors'
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
