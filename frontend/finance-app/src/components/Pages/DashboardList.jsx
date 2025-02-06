import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../api/apiService"; // Importing from the new service
// import Navbar from "../Layout/Navbar"; // Import Navbar

function DashboardList() {
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* <Navbar /> */}
      <div className="container mx-auto px-6 py-12">
        {/* <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Projects
        </h1> */}


        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-3/4 lg:w-full px-4">
            {/* <h2 className="text-2xl font-semibold text-gray-700 mb-6">Projects</h2> */}

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full table-auto text-sm text-gray-600">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">Serial No</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition duration-300 ease-in-out"
                    >
                      <td className="py-3 px-4">{project.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {project.title}
                      </td>
                      <td className="py-3 px-4">{project.status}</td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/project/${project.id}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <Link
                to="/add-project"
                className="inline-block px-6 py-3 text-white bg-gray-800 rounded-lg shadow-lg hover:bg-gray-900 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Add New Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardList;
