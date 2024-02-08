"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

export default function forgetPassword() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
  });

  const [buttondisabled, setButtonDisabled] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const checkButtonState = async () => {
    if (!buttondisabled) {
      const resetPassword = async () => {
        try {
          setLoading(true);
          await axios.post("/api/users/forgetpassword", user);
          setSuccess(true);
          setError(false);
          console.log(user);
        } catch (error: any) {
          setError(true);
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      };
      resetPassword();
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center  min-h-screen py-2 bg-slate-900">
      <div className="flex flex-col text-left w-full sm:w-[500px]  mx-4 sm:mx-0  text-lg font-medium p-8 text-black rounded-xl  bg-slate-300">
        {/* <label htmlFor="email" className='mt-6'>Email</label> */}

        {!success && (
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[18px] font-semibold">
              {loading ? "Sending..." : "Enter email to reset password"}
            </label>
            <input
              className="text-gray-600 p-2 border border-gray-300 rounded-lg mt-4 h-12 focus:outline-none focus:border-gray-600"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </div>
        )}

        {success && (
          <div>
            <p className="text-[20px] font-semibold mt-2 text-green-500">
              Password reset link has been sent to your email
            </p>
            <Link href="/login">
              <button className="p-2 h-12 text-white font-semi-bold bg-green-500 border border-gray-300 rounded-lg my-6 hover:bg-green-800">
                Go to Login
              </button>
            </Link>
          </div>
        )}

        {!success && (
          <button
            onClick={checkButtonState}
            className="p-2 h-12 text-white font-bold bg-green-500 border border-gray-300 rounded-lg mt-6 mb-3 hover:bg-green-800"
          >
            Send Email link
          </button>
        )}

        {error && (
          <div className="flex items-center gap-2 font-bold text-red-500">
            <p className="text-sm">Email not found</p>
            <FaExclamationCircle />
          </div>
        )}
      </div>
    </div>
  );
}
