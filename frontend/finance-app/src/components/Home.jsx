import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to Business Finance Management Application
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            View All Projects
          </Link>
          <Link
            to="/add-project"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add New Project
          </Link>
          <Link
            to="/events"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Upcoming Events
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
