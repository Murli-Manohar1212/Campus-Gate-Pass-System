import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
export default function Home() {
  
   const [rollNo, setRollNo] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

         //  this function handel the enter gate function component
const handleEnterCampus = async () => {
  try {
    const response = await api.post("/students/login", {
      rollNo,
      Password,
    });

    if (response.status === 200) {
      navigate("/logout"); // 🔁 Go to EnterGate.jsx page
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Roll number or password incorrect, please try again.");
  }
};


  const handleExitCampus = async () => {
    try {
      const response = await api.post("/students/login", {
        rollNo,
        Password,
      });

      if (response.status === 200) {
        navigate("/login"); // go to ExitGate.jsx
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Roll number or password incorrect, please try again.");
    }
  };

  return (
   
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative"
      style={{
        backgroundImage: `url("https://alumini-nitp.vercel.app/images/bihtacampus/Maingate.jpeg")`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // transform: "translateY(-50px)"
      }}
    >
      {/* Top bar with Register button */}
      <div className="absolute top-6 right-6 z-50">
        <Link to="/register">
          <button className="bg-green-200 border border-green-500 text-blue-700 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition font-semibold">
            Register
          </button>
        </Link>
      </div>

      {/* Login Form shifted to left side */}
      <div className=" absolute flex-grow flex items-center justify-start px-16 z-10  top-[10px] right-[265px] ">
        <div className="border bg-opacity-95 p-8 rounded-lg shadow-2xl w-[600px] space-y-5">
          <h2 className="text-2xl font-bold text-center text-grey-800">Campus Gate Access</h2>
          <input
            type="text"
            placeholder="Roll Number"
             value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
             type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-between space-x-4">
  
     <div className="flex space-x-4 w-full">
  
    <button onClick={handleEnterCampus} className="w-full bg-green-400 text-black py-2 rounded hover:bg-green-700 transition font-medium">
      ENTER-CAMPUS
    </button>
  

  
    <button onClick = {handleExitCampus} className="w-full bg-red-400 text-black py-2 rounded hover:bg-red-700 transition font-medium">
      EXIT-CAMPUS
    </button>
  
</div>



</div>
          <p className="text-sm text-black-600 text-center">New here?  Register first to continue.😊 </p>
        </div>
      </div>
    </div>
  );
}
