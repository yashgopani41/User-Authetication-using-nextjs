"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          {loading ? "Processing" : "Signup"}
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="username"
              value={user.username}
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              value={user.email}
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              autoComplete="off"
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Add pr-10 for padding right to accommodate icons
              type={showPassword ? "text" : "password"}
              id="password"
              value={user.password}
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              autoComplete="off"
            />

            {showPassword ? (
              <VisibilityOffIcon
                className="absolute right-4 top-9 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityIcon
                className="absolute right-4 top-9 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              buttonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Processing" : "Signup"}
          </button>
        </div>
        <h2 className="text-black">Already have an account? </h2>
        <Link href="/login" className="text-blue-500 hover:text-blue-800">
          Visit Login Page
        </Link>
      </div>
    </>
  );
};

export default SignupPage;
