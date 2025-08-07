import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js" // import the axios instance
export default function Register() {
  const [formData, setFormData] = useState({
    Name: "",
    Password: "",
    Email: "",
    rollNo: "",
    Branch: "",
    Course: "",
    State: "",
    Village: "",
    PostOffice: "",
    PoliceStation: "",
    District: "",
    PinCode: "",
    AcdemicYear: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();

    const { Name, rollNo, Email } = formData;

    if (Name && rollNo && Email) {
      setSubmitted(true);

      // Simulate delay then navigate to Home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };*/

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/students/register", formData);
      console.log(res.data.message);
      setSubmitted(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed");
      alert(err.response?.data?.message || "Registration failed...please enter the unique roll no");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <h2 className="text-2xl text-green-800 font-semibold">
          🎉 Welcome, you are successfully registered!
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-blue-800 mb-6">
        National Institute of Technology Patna
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          { label: "Full Name", name: "Name" },
          { label: "Password", name: "Password", type: "password" },
          { label: "Email", name: "Email", type: "email" },
          { label: "Roll Number", name: "rollNo", type: "number" },
          { label: "Branch", name: "Branch" },
          { label: "Course", name: "Course" },
          { label: "State", name: "State" },
          { label: "Village", name: "Village" },
          { label: "Post Office", name: "PostOffice" },
          { label: "Police Station", name: "PoliceStation" },
          { label: "District", name: "District" },
          { label: "Pin Code", name: "PinCode", type: "number" },
          { label: "Academic Year", name: "AcdemicYear" }
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-gray-700 font-medium">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              required
              value={formData[name]}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <div className="col-span-full mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
