import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart is a modern grocery delivery web app clone featuring product browsing by categories, advanced search, cart management, user authentication, order placement with live tracking, wishlist support, and a fully responsive, fast, and clean interface. Built for learning and showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= {`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-green-100 to-white w-full min-h-screen`}
      >
        {children}
        <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
      </body>
    </html>
  );
}
