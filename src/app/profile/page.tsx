"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/data");
      console.log("🚀 ~ getUserDetail ~ res:", res.data);
      setData(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">Profile</h1>
      <hr className="w-full mb-4" />
      <p className="text-4xl mb-8 text-slate-800">Profile Page</p>
      {data === "" ? (
        ""
      ) : (
        <>
          <div className="bg-green-500 p-2 rounded mb-4">
            <Link href={`/profile/${data}`}>{data}</Link>
          </div>
        </>
      )}
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <button
        onClick={getUserDetail}
        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
