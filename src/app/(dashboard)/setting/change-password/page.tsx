/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/redux/features/auth/authAPI";
// Make sure to import your mutation hook here

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [updatePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      // FIX: Map the React state to the snake_case keys your API expects
      const payload = {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      };

      const res = await updatePassword(payload).unwrap();

      if (res.success) {
        toast.success(res.message || "Password updated successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        router.push("/setting");
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Failed to update password";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6'>
              <Link
                href='/setting'
                className='inline-flex items-center text-black hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl text-black font-semibold'>
                  Change Password
                </span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <div className='flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md'>
                  <AlertCircle className='h-4 w-4' />
                  <span>{error}</span>
                </div>
              )}

              {/* Current Password Field */}
              <div className='space-y-2 flex flex-col'>
                <label
                  htmlFor='currentPassword'
                  style={{ color: "#17CA2A" }}
                  className='text-lg font-medium text-black'
                >
                  Current Password
                </label>
                <div className='relative'>
                  <input
                    id='currentPassword'
                    name='currentPassword'
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder='Enter current password'
                    className='text-lg font-medium text-black w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div className='space-y-2 flex flex-col'>
                <label
                  htmlFor='newPassword'
                  style={{ color: "#17CA2A" }}
                  className='text-lg font-medium text-black'
                >
                  New Password
                </label>
                <div className='relative'>
                  <input
                    id='newPassword'
                    name='newPassword'
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder='Enter new password'
                    className='text-lg font-medium text-black w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2 flex flex-col'>
                <label
                  htmlFor='confirmPassword'
                  style={{ color: "#17CA2A" }}
                  className='text-lg font-medium text-black'
                >
                  Confirm New Password
                </label>
                <div className='relative'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Re-type new password'
                    className='text-lg font-medium text-black w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className='pt-2'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='bg-primary hover:bg-[#5a0921] text-lg font-medium text-white px-8 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
