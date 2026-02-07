import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-200">
      <div className="text-center bg-white px-16 py-12 rounded-xl shadow-lg animate-fadeIn">
        <h1 className="text-8xl font-bold text-red-500 mb-2 animate-flip inline-block">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          User Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The user you are looking for does not exist.
          <br />
          Please check the link and try again.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2 bg-red-500 text-white rounded-md transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-red-600"
        >
          Go Back Home
        </a>
      </div>

   
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes flip {
            0% {
              transform: rotateY(0deg);
            }
            50% {
              transform: rotateY(180deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }

          .animate-flip {
            animation: flip 3s infinite;
          }
        `}
      </style>
    </div>
  );
}

