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
// test
  // Handle code submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code) {
      window.location.href = `/scan?Code=${code}`; // Redirect to /scan with the code
    }
  };

  return (
    <div className="min-h-screen relative  flex items-center justify-center">
    {/* Background Image (Centered) */}
    <img
      src="/background.jpg"
      className="absolute inset-0 w-full  object-cover object-center z-0"
      alt="Background"
    />
  
    {/* Content Container */}
    <div className="relative z-8 text-center px-6 sm:px-12 w-full mx-auto">
  <div className="flex justify-center items-start h-screen ">
    <div className="w-1/5 mt-[20vh] md:mt-[25vh] lg:mt-[30vh] xl:mt-[35vh] 2xl:mt-[40vh]">
      {database.length > 0 ? (
        database.map((entry, index) => (
          <div
            key={index}
            className="text-[2vw] flex items-center justify-left text-center text-white p-0 backdrop-blur-none rounded-xl shadow-none min-h-[10px] font-academy"
          >
            {entry.name}
          </div>
        ))
      ) : (
        <p className="text-white text-lg font-semibold font-academy">
          No data stored yet.
        </p>
      )}
    </div>
  </div>
</div>
  
  


      {/* Button to Show Popup */}
      <button
        className="fixed top-4 left-4 p-2 bg-white z-10"
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
