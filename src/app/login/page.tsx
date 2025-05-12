"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setBtnDisabled(false);
    else {
      setBtnDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {

    try {
      setLoading(true)
      const response = await axios.post('/api/users/login' , user);
      console.log(response.data);
      toast.success('Login successfull');
      router.push('/profile')

      
    } catch (error:any) {
      toast.error('Invalid details' , error);
    }
    finally{
      setLoading(false);
    }
  };
  return loading ? (
    "loading"
  ) : (
    <div className="flex justify-center items-center h-dvh px-2">
      <div className="flex flex-col justify-center   px-4 py-6 rounded-2xl w-[100%] max-w-[350px] border-2 border-[#5a5a5a6c]">
        <h1 className="text-2xl mb-6 font-bold">LOGIN</h1>
        <hr className="mb-6" />
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="text"
          className="p-2 border rounded-lg focus:outline-none bg-white text-black mb-2"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="username" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          className="p-2 border rounded-lg focus:outline-none bg-white text-black mb-2"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="text-white font-bold bg-blue-500 rounded py-2 mt-4 cursor-pointer"
          onClick={onLogin}
        >
          {btnDisabled ? "Please fill the details" : "Login"}{" "}
        </button>
        <Link
          href="/signup"
          className="font-semibold mt-4  text-center text-xs"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
