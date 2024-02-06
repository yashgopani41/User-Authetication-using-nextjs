"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Succesully", response.data);
      toast.success("SignUp Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <div className="bg-slate-600 flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{!loading ? "Signup" : "Processing"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          autoComplete="off"
        />
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
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-gray-500"
        >
          {buttonDisabled ? "No Signup " : "Signup"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </>
  );
};

export default SignupPage;
