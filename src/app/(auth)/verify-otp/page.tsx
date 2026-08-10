"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerifyFogotPassOtpMutation } from "@/redux/features/auth/authAPI";

export default function VerifyAccountPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [verifyFogotPassOtpMutation] = useVerifyFogotPassOtpMutation();

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = digits[i] || "";
        }
        setOtp(newOtp);

        // Focus on next empty input or last input
        const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Execute the API call with the requested body structure
      const response = await verifyFogotPassOtpMutation({
        otp: otpCode,
      }).unwrap();

      // Check if access_token exists in the response and save to localStorage
      if (response?.data?.access_token) {
        localStorage.setItem("accessToken", response.data.access_token);
      }

      // Redirect to the reset-password page
      router.push(`/reset-password`);
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setError(
        err?.data?.message || "Invalid verification code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");

    try {
      // Note: In a real app, you would dispatch your resend OTP mutation here
      // (likely using the email parameter from the URL).
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear current OTP and focus first input
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      console.error("Resend OTP Error:", err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className='absolute inset-0 top-0 left-0 w-full h-full bg-black opacity-30'></div>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-lg p-8 relative'>
          {/* Back Button */}
          <Link
            href='/forgot-password'
            className='absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-gray-600' />
          </Link>

          {/* Header */}
          <div className='text-center mb-8 mt-4'>
            <h1 className='text-2xl font-bold text-gray-900 mb-3'>
              Verify Your Account
            </h1>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerification} className='space-y-6'>
            {/* OTP Input Fields */}
            <div className='flex justify-center gap-3 mb-6'>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='w-12 h-12 text-center text-lg font-semibold border-2 rounded-xl text-black focus:border-[#030712] focus:ring-[#030712]'
                  placeholder='-'
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <p className='text-red-500 text-sm text-center bg-red-50 p-2 rounded-md border border-red-200'>
                {error}
              </p>
            )}

            {/* Verification Button */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-[#030712] hover:bg-[#030712]/90 text-white py-3 rounded-xl font-medium transition-colors'
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>

            {/* Resend Code */}
            <div className='text-center'>
              <span className='text-gray-600 text-sm'>
                Didn't receive code?{" "}
              </span>
              <button
                type='button'
                onClick={handleResendCode}
                disabled={isResending}
                className='text-[#030712] text-sm font-medium hover:text-gray-600 transition-colors disabled:opacity-50'
              >
                {isResending ? "Sending..." : "Resend Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
