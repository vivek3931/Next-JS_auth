"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    "loading..."
  ) : (
    <div className="flex justify-center items-center h-dvh px-2 bg-white text-black">
      <div className="flex flex-col justify-center px-4 py-6 rounded-2xl w-[100%] max-w-[350px]  shadow">
        <h1 className="text-2xl mb-6 font-bold">SIGNUP</h1>
        <hr className="mb-6 " />
        <label htmlFor="username" className=" text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter username"
          className="p-2 border rounded-lg focus:outline-none  text-black mb-2"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="text"
          className="p-2 border rounded-lg focus:outline-none  text-black mb-2"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="username" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          className="p-2 border rounded-lg focus:outline-none  text-black mb-2"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="text-white font-bold bg-blue-500 rounded py-2 mt-4 cursor-pointer"
          onClick={onSignup}
        >
          {btnDisabled ? "Please fill details" : "Signup"}
        </button>
        <Link href="/login" className="font-semibold mt-4  text-center text-xs">
          Already have an account? Log in
        </Link>
      </div>
      <Toaster position="top-center"/>
    </div>
  );
}
