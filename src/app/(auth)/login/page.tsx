"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sign in data:", formData);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className='absolute inset-0 top-0 left-0 w-full h-full bg-black opacity-30'></div>

      <Card className='relative w-full max-w-md bg-white shadow-lg border-0'>
        <CardContent className='pb-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-5xl font-medium text-[#4B5563] mb-2'>
              Sign in
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Address */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-700 font-medium'>
                Email Address
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-gray-700 font-medium'>
                Password
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Min 6 character'
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 h-12 pr-10 bg-gray-50 border-gray-200 focus:bg-white ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className='text-right'>
              <Link
                href='/forgot-password'
                className='text-[#030712] text-sm hover:text-[#030712] transition-colors'
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full h-12 bg-[#030712] hover:bg-[#030712] text-white font-medium py-3 rounded-lg transition-colors'
            >
              {isLoading ? "Signing In..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
