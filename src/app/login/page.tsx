"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          {loading ? "Processing" : "Login"}
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="email"
            id="email"
            value={user.email}
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            autoComplete="off"
          />
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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

            <button
              onClick={onLogin}
              disabled={buttonDisabled}
              className={`bg-blue-500 m-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                buttonDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? "Processing" : "Login"}
            </button>
          </div>
        </div>
        <Link
          href="/forgetpassword"
          className="text-blue-500 hover:text-blue-800"
        >
          Forget Password?
        </Link>
        <h2 className="text-black">Don't have an account? </h2>
        <Link href="/signup" className="text-blue-500 hover:text-blue-800">
          Visit Signup Page
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
