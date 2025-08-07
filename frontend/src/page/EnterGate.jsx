import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterGate() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/students/me", {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setStudent(data?.data?.user);
      } catch (err) {
        console.error("Failed to fetch student:", err);
        setError("Unauthorized or server error. Please log in again.");
      }
    };

    fetchStudent();
  }, []);

  const currentTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🏫 Welcome to Campus</h2>

      {error && (
        <div className="text-red-600 text-center mb-4">{error}</div>
      )}

      {student ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 text-center">
          <p><strong>Name:</strong> {student.Name}</p>
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          <p><strong>Status:</strong> Student is <span className="text-green-600 font-bold">Entering the Campus</span></p>
          <p><strong>Current Time:</strong> {currentTime}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go to Home
          </button>
        </div>
      ) : !error ? (
        <p>Loading student details...</p>
      ) : null}
    </div>
  );
}
