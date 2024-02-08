"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function resetPassword() {
  const router = useRouter();
  const [user, setUser] = useState({
    token: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetUserPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", user);
      toast.success("Password Changed Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
    console.log("🚀 ~ resetUserPassword ~ user:", user);
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({ ...user, token: urlToken || "" });
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-screen py-2 bg-slate-900">
        <div className="flex flex-col text-left w-full sm:w-[500px]  mx-4 sm:mx-0  text-lg font-medium p-8 text-black rounded-xl  bg-slate-300">
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Reset Your Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              type={showPassword ? "text" : "password"}
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
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
              onClick={resetUserPassword}
              className="bg-blue-500 m-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
// }
