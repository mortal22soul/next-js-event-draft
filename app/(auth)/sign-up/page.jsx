import { SignUpForm } from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-blue-900/90 z-10"
          style={{
            backgroundImage: `url('/sign-up-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Centered Content */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-12 text-white">
          <h1 className="text-4xl font-semibold mb-4">Welcome back</h1>
          <p className="text-gray-200 text-center">
            To keep connected with us provide us with your information
          </p>
          <Link href="/sign-in">
            <button className="mt-6 px-8 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors w-fit">
              Signin
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <SignUpForm />
      </div>
    </main>
  );
}