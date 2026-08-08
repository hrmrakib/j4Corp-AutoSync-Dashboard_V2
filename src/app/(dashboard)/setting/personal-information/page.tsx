"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";
import { useGetProfileQuery } from "@/redux/features/setting/settingAPI";

export default function PersonalInformationPage() {
  const { data: profileData, isLoading } = useGetProfileQuery({});

  const profile = profileData?.data;

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#FFFFFF]'>
        <p className='text-lg text-black animate-pulse'>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-[#FFFFFF] rounded-2xl'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className=' mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-black hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl font-semibold'>
                  Personal Information
                </span>
              </Link>
              <Link
                href='/setting/personal-information/edit'
                className='bg-primary text-white rounded-md px-4 py-2'
              >
                <div className='flex items-center gap-2'>
                  <Edit className='h-4 w-4' />
                  <span>Edit</span>
                </div>
              </Link>
            </div>

            <div className='bg-[#ffffff93] rounded-md p-6'>
              <div className='flex flex-col md:flex-row gap-8 mb-6'>
                {/* Profile Photo Section */}
                <div className='w-full md:w-64 flex flex-col items-center border border-gray-600 rounded-md px-6 py-10'>
                  <div className='w-32 h-32 rounded-full overflow-hidden relative mb-3'>
                    <Image
                      src={profile?.profile_pic || "/admin.jpg"}
                      alt='Profile'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span className='text-base text-black uppercase'>
                    {profile?.is_superuser ? "Superuser" : profile?.is_staff ? "Admin" : "User"}
                  </span>
                  <span className='font-medium text-lg text-black'>
                    {profile?.full_name || profile?.first_name || "N/A"}
                  </span>
                </div>

                {/* User Information Section */}
                <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>First Name</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.first_name || "N/A"}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Last Name</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.last_name || "N/A"}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Username</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.username || "N/A"}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Email</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.email || "N/A"}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Phone</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.phone || "N/A"}
                    </div>
                  </div>
                  
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Address</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.address || "N/A"}
                    </div>
                  </div>
                  
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Zip Code</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.zip_code || "N/A"}
                    </div>
                  </div>
                  
                  <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium text-black'>Date of Birth</div>
                    <div className='text-lg text-black px-2 py-3 rounded-md border border-gray-500'>
                      {profile?.dob || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
