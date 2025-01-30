import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function HomePage() {
  const [database, setDatabase] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [code, setCode] = useState(""); // State to store the entered code

  // Fetch data from Firestore on component load
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDatabase(fetchedData);
    };
    fetchData();
  }, []);

  // Handle code submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code) {
      window.location.href = `/scan?Code=${code}`; // Redirect to /scan with the code
    }
  };

  return (
    <div className="min-h-screen relative overflow-scroll">
      {/* Background Image */}
      <img
        src="/background.jpg"
        className="absolute inset-0 w-full min-h-screen object-cover object-[center_top] z-0"
        alt="Background"
      />

      {/* Content Overlay */}
      <div className="absolute z-10 sm:left-[45%] left-[45%] top-[15%] sm:top-[25%]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {database.length > 0 ? (
            database.map((entry, index) => (
              <div key={index} className="text-white">
                {entry.name}
              </div>
            ))
          ) : (
            <p className="text-white">No data stored yet.</p>
          )}
        </div>
      </div>

      {/* Button to Show Popup */}
      <button
        className="fixed top-4 left-4 p-2 bg-white"
        onClick={() => setShowPopup(true)}
      >
        Add your name to the stone
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Your Name</h2>

            {/* Option 1: Enter Code */}
            <form onSubmit={handleSubmit} className="mb-4">
              <label className="block mb-2">
                Enter Code:
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your code"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>

            {/* Option 2: Purchase Special Edition CD */}
            <div className="text-center">
              <p className="mb-2">OR</p>
              <a
                href="https://square.link/u/kpHP3jEL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 block"
              >
                Purchase the Special Edition CD
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
