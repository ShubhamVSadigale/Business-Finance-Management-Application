import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function EditProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
  });
  const [events, setEvents] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch project data based on id

    axios.get(`http://localhost:8080/api/projects/${id}`).then((response) => {
      console.log(response.data);
      setFormData(response.data);
      setEvents(response.data.events);
    });
    // For demo purposes, we'll use mock data
    // setFormData({
    //   name: `Project ${id}`,
    //   description: "This is a sample project description.",
    //   status: "In Progress",
    // });
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Project data:", formData);
    // Here you would typically send the updated data to your backend
    axios
      .put(`http://localhost:8080/api/projects/${id}`, formData)
      .then((response) => {
        console.log(response);
        console.log("Project data updated!");
      })
      .catch((err) => {
        console.log(err);
        console.log("ID: ", id);
        console.log(formData);
      });

    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project Id : {formData.id}
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project start date : {formData.startDate}
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project end date : {formData.endDate}
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Planning">Planning</option>
            <option value="In_Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          {/* <h2 className="text-xl font-bold mb-4">Project Events</h2> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Events :
            </label>
          </div>
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
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
    <footer />
    </div>
  );
}

export default EditProject;
