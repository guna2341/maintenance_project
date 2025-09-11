import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-5xl font-bold text-red-500">404</h1>
            <p className="text-lg text-gray-600 mt-4">Oops! Page not found.</p>
            <button
                onClick={() => navigate("/bit_maintenance/dashboard")}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </button>
        </div>
    );
};
