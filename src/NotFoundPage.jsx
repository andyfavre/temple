import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
