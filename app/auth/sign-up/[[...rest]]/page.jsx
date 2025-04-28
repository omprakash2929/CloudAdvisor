"use client"
import SaveUserToMongo from "@/components/SaveUserToMongo";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
      <SaveUserToMongo />
    </div>
  );
}
