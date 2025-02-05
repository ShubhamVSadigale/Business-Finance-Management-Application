import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

//Updated dashboard
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Fetch projects and upcoming events from your API
    // For demo purposes, we'll use mock data

    axios.get("http://localhost:8080/api/projects").then((response) => {
      console.log(response.data);
      // setEmpdata(response.data);
      setProjects(response.data);

      console.log(response.data);
    });

    // setProjects([
    //   {id: 1, name: "Project A", status: "In Progress"},
    //   {id: 2, name: "Project B", status: "Completed"},
    //   {id: 3, name: "Project C", status: "Planning"},
    // ]);

    // setUpcomingEvents([
    //   {id: 1, name: "Meeting for Project A", date: "2023-05-15"},
    //   {id: 2, name: "Deadline for Project B", date: "2023-05-20"},
    //   {id: 3, name: "Kickoff for Project C", date: "2023-05-25"},
    // ]);

    axios
      .get("http://localhost:8080/api/projects/upcoming-events")
      .then((response) => {
        console.log(response.data);
        // setEmpdata(response.data);
        setUpcomingEvents(response.data);

        console.log(response.data);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Serial No</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t">
                    <td className="py-2 px-4">{project.id}</td>
                    <td className="py-2 px-4">{project.title}</td>
                    <td className="py-2 px-4">{project.status}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/project/${project.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            to="/add-project"
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Add New Project
          </Link>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul>
              {upcomingEvents.map((event) => (
                <li key={event.id} className="mb-2">
                  <span className="font-semibold">{event.title}</span>
                  <br />
                  <span className="text-sm text-gray-600">
                    {event.eventDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
