"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      localStorage.setItem("token", response?.data?.token);

      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <Toaster />
      <div className="bg-slate-600 flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          autoComplete="off"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          autoComplete="off"
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-gray-800"
        >
          {buttonDisabled ? "No Login " : "Submit"}
        </button>
        <Link className="text-blue-500" href="/signup">
          Visit Signup Page
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
