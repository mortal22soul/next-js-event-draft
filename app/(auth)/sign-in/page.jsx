import { SignInForm } from "@/components/auth/sign-in-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <SignInForm />
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/90 z-10"
          style={{
            backgroundImage: `url('/sign-in-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 flex flex-col justify-center items-center px-12 text-white text-center">
          <h1 className="text-4xl font-semibold mb-4">Hello Friend</h1>
          <p className="text-gray-200">To keep connected with us provide us with your information</p>
          <Link href={"/sign-up"}>
            <button className="mt-6 px-8 py-2 bg-white/10 hover:bg-white/20 rounded-none text-sm transition-colors">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}