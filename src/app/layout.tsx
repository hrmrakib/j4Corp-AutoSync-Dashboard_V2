import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ToastContainer } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import Providers from "@/redux/features/Providers";
import AppInitializer from "@/components/AppInitializer/AppInitilizer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "J4Crop AutoSync Dashboard",
  description:
    "Manage users, appointments, and sell requests with the J4Crop AutoSync admin dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn("h-full", inter.variable, "font-sans", geist.variable)}
    >
      <body className='min-h-full font-sans antialiased'>
        <Providers>
          <AppInitializer>
          <SidebarProvider>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </SidebarProvider>
          </AppInitializer>
        </Providers>
      </body>
    </html>
  );
}
