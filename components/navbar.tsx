// app/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold text-gray-800">
        OpportunityApp
      </Link>

      <div className="flex gap-4">
        <Link href="/login" className="text-gray-600 hover:text-black">
          Login
        </Link>
        <Link href="/register" className="text-gray-600 hover:text-black">
          Register
        </Link>
      </div>
    </nav>
  );
}
