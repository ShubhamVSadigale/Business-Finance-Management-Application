import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

function Account() {
  const [userData, setUserData] = useState({
    username: "User's Name",
    email: "username@gmail.com",
    role: "Admin",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full sm:w-96 bg-white shadow-lg rounded-3xl p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <FaUserCircle className="w-28 h-28 text-gray-500" />
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Account Details
        </h3>

        {/* User Information */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Username</span>
            <span className="font-semibold text-gray-800">{userData.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-semibold text-gray-800">{userData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Role</span>
            <span className="font-semibold text-gray-800">{userData.role}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Account;
    