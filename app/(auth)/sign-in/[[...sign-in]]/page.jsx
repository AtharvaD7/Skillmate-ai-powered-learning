import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Watermark Logo & Name */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
        <Image src="/cleanlogo.svg" alt="SkillMate Logo" width={300} height={300} />
        <h1 className="text-[12rem] font-bold text-gray-500">SkillMate</h1>
      </div>

      {/* Sign-In Card */}
      <div className="relative z-10">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-lg rounded-lg bg-white p-6", 
              headerTitle: "text-2xl font-bold text-center",
              headerSubtitle: "text-gray-600 text-center",
              formFieldInput: "border-gray-300 rounded-md",
              submitButton: "bg-blue-600 hover:bg-blue-700 text-white font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
