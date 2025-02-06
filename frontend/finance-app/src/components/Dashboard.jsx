import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../apiService"; // Importing from the new service
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from your API
    fetchProjects().then((data) => {
      console.log(data);
      setProjects(data);
    });


    // For demo purposes, you can mock data like this:
    // setProjects([
    //   {id: 1, name: "Project A", status: "In Progress"},
    //   {id: 2, name: "Project B", status: "Completed"},
    //   {id: 3, name: "Project C", status: "Planning"},
    // ]);
  }, []);

  if (!projects.length) {
    return <div className="text-center text-lg">No projects available.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600">Status: {project.status}</p>
              <Link to={`/project/${project.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Dashboard;
