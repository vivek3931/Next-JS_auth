"use client";
import axios from "axios";
// import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import mountainImage from '../../../public/mountain.png'

export default function Profile() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error:any) {
      toast.error("Something went wrong", error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-gray-100">
      <Toaster />
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="px-3 py-3 bg-orange-500 rounded-2xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profile Page</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="py-3 px-4 bg-white font-bold rounded-full text-black cursor-pointer hover:bg-gray-100 ease-in-out duration-300 "
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4 mt-4">
            <Image
              src={mountainImage}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Duck Cat</h1>
          <p className="text-gray-600 mb-4">Software Engineer</p>

          <div className="w-full border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h2 className="text-lg font-semibold">About</h2>
                <p className="text-gray-600">
                  Passionate software developer with experience in React and
                  TypeScript.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="text-gray-600">email@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
