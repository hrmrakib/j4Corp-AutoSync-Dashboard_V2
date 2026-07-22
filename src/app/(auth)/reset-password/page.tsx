"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordMutation] = useResetPasswordMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 10) {
      newErrors.password = "Password must be 6-10 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // Execute the API call with the required body structure
      await resetPasswordMutation({
        new_password: formData.password,
        confirm_password: formData.confirmPassword,
      }).unwrap();

      // Clean up the temporary access token used for resetting
      localStorage.removeItem("accessToken");

      // Redirect to password success page
      router.push("/password-success");
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setErrors({
        form:
          error?.data?.message || "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.form) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors.form;
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className='absolute inset-0 top-0 left-0 w-full h-full bg-black opacity-30'></div>

      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
        >
          <ArrowLeft className='w-5 h-5 text-gray-600' />
        </button>

        {/* Header */}
        <div className='text-center mb-8 mt-4'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            Reset Password
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* General API Error Message */}
          {errors.form && (
            <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200'>
              {errors.form}
            </div>
          )}

          {/* Password Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='password'
              className='text-lg font-medium text-[#030712]'
            >
              Password
            </Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Enter new password'
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 pr-10 h-12 bg-gray-50 border-gray-200 rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='confirmPassword'
              className='text-lg font-medium text-[#030712]'
            >
              Confirm Password
            </Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Re-type new password'
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`pl-10 pr-10 h-12 bg-gray-50 border-gray-200 rounded-lg ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showConfirmPassword ? (
                  <EyeOff className='w-4 h-4' />
                ) : (
                  <Eye className='w-4 h-4' />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isLoading}
            className='w-full h-12 bg-[#030712] hover:bg-[#030712]/90 text-white font-medium rounded-lg transition-colors'
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
