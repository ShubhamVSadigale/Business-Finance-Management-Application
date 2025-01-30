import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [events, setEvents] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    // Fetch project details and events from your API
    // For demo purposes, we'll use mock data
    axios.get(`http://localhost:8080/api/projects/${id}`).then((response) => {
      console.log(response.data);
      // setEmpdata(response.data);
      setProject(response.data);
      setEvents(response.data.events);

      console.log(response.data);
    });

    // setProject({
    //   id: id,
    //   name: `Project ${id}`,
    //   description: "This is a sample project description.",
    //   status: "In Progress",
    // });

    // setEvents([
    //   {id: 1, name: "Kickoff Meeting", date: "2023-05-15"},
    //   {id: 2, name: "Mid-project Review", date: "2023-06-01"},
    //   {id: 3, name: "Final Presentation", date: "2023-06-15"},
    // ]);
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Project Details</h2>
        <p>
          <strong>Project Id:</strong> {project.id}
        </p>
        <p>
          <strong>Project Title:</strong> {project.title}
        </p>
        <p>
          <strong>Description:</strong> {project.description}
        </p>
        <p>
          <strong>Start date:</strong> {project.startDate}
        </p>
        <p>
          <strong>Start date:</strong> {project.endDate}
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <Link
          to={`/edit-project/${project.id}`}
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
        >
          Edit Project
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Project Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-2">
              <span className="font-semibold">Event id : {event.id}</span>
              <br />
              <span className="font-semibold">{event.title}</span>
              <br />
              <span className="text-sm text-gray-600">{event.eventDate}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;
