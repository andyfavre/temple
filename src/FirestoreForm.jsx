import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validCodes } from "./codes";

function FirestoreForm() {
  const [formData, setFormData] = useState({ name: "", email: "", code: "" });
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [existingDocId, setExistingDocId] = useState(null); // Store existing document ID if found
  const [loading, setLoading] = useState(true); // Loading state for initial load and submission
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  useEffect(() => {
    const code = searchParams.get("Code");
    if (code && validCodes.includes(code)) {
      setFormData((prev) => ({ ...prev, code }));
      setIsCodeValid(true);
      checkExistingUser(code);
    } else {
      setIsCodeValid(false);
      setLoading(false); // Stop loading if the code is invalid
    }
  }, [searchParams]);

  const checkExistingUser = async (code) => {
    try {
      const q = query(collection(db, "users"), where("code", "==", code));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setExistingDocId(querySnapshot.docs[0].id); // Store the document ID
        setFormData({ name: userData.name, email: userData.email, code: code });
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false); // Stop loading after checking user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.code) {
      setIsSubmitting(true); // Start submitting
      try {
        if (existingDocId) {
          // Update the existing document
          const userDocRef = doc(db, "users", existingDocId);
          await updateDoc(userDocRef, {
            name: formData.name,
            email: formData.email,
          });
          alert("User updated successfully!");
        } else {
          // Create a new document
          await addDoc(collection(db, "users"), formData);
          alert("User created successfully!");
        }
        navigate("/");
      } catch (error) {
        console.error("Error saving document:", error);
      } finally {
        setIsSubmitting(false); // Stop submitting
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isCodeValid) {
    return (
      <div className="p-2 max-w-md min-h-screen mx-auto flex justify-center items-center">
        <div className="bg-red-100 rounded shadow p-4">
          <h1 className="text-xl font-bold text-red-700 mb-2">
            Invalid or Missing Code
          </h1>
          <p>Please provide a valid code in the URL to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Founder's Stone
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Code (Auto-filled):
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              disabled
              className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg shadow-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-medium text-lg bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FirestoreForm;
