import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import footer from "./Footer";

function AddEditProject() {
  const [formData, setFormData] = useState({
    // name: "",
    // description: "",
    // status: "",
    events: [],
  });
  const [currentEvent, setCurrentEvent] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      // Fetch project details from your API
      // For demo purposes, we'll use mock data

      axios.get(`http://localhost:8080/api/projects/${id}`).then((response) => {
        // console.log(response.data);
        // setEmpdata(response.data);
        // setProject(response.data);
        // setEvents(response.data.events);
        setFormData(response.data);
        setCurrentEvent(response.data.events);
        console.log(response.data);
      });

      // setFormData({
      //   name: `Project ${id}`,
      //   description: "This is a sample project description.",
      //   status: "In Progress",
      // });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleEventChange = (e) => {
    setCurrentEvent({...currentEvent, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the project data to your backend

    formData.id = "P" + Date.now();

    formData.startDate = generateDateTimeWithDefaultTime(formData.startDate);

    formData.endDate = generateDateTimeWithDefaultTime(formData.endDate);

    if (isEditing) {
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
      // .finally((formData) => console.log(formData));

      console.log("Project data:", formData);
      // For demo purposes, we'll just redirect to the dashboard
      navigate("/dashboard");
    } else {
      axios
        .post(`http://localhost:8080/api/projects`, formData)
        .then((response) => {
          console.log(response);
          console.log("Project added");
        })
        .catch((err) => {
          console.log(err);
          console.log("ID: ", id);
          console.log(formData);
        });
      navigate("/dashboard");
    }
  };
  const addEvent = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        {
          ...currentEvent,
          id: "E" + Date.now(),
          projectId: formData.id,
          eventDate: generateDateTimeWithDefaultTime(currentEvent.eventDate),
        },
      ],
    });
    setCurrentEvent({
      title: "",
      description: "",
      eventDate: "",
      notificationPreference: "",
    });
  };

  const removeEvent = (eventId) => {
    setFormData({
      ...formData,
      events: formData.events.filter((event) => event.eventId !== eventId),
    });
  };

  function generateDateTimeWithDefaultTime(dateString) {
    const [year, month, day] = dateString.split("-");
    const targetDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0, 0)); // Month is 0-indexed
    // return targetDate.toISOString().replace(/\.000Z$/, "Z"); // remove milliseconds
    return targetDate.toISOString(); // remove milliseconds
  }

  return (
    <div>
      <Navbar />

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project Id : {formData.id}
          </label>
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Project Title
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
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Startdate : {formData.startDate}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Enddate : {formData.endDate}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
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

        <h2 className="text-2xl font-bold mb-4 mt-8">Events</h2>

        {formData?.events &&
          formData.events.length > 0 &&
          formData.events.map((event, index) => (
            <div key={event.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {event.eventDate}</p>
              <p>Notification: {event.notificationPreference}</p>
              <button
                type="button"
                onClick={() => removeEvent(event.eventId)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Event
              </button>
            </div>
          ))}

        <div className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Add New Event</h3>
          <div className="mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="title"
              value={currentEvent.title}
              onChange={handleEventChange}
              placeholder="Event Title"
            />
          </div>
          <div className="mb-2">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={currentEvent.description}
              onChange={handleEventChange}
              placeholder="Event Description"
              rows="2"
            />
          </div>
          <div className="mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="eventDate"
              value={currentEvent.eventDate}
              onChange={handleEventChange}
            />
          </div>
          <div className="mb-2">
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="notificationPreference"
              value={currentEvent.notificationPreference}
              onChange={handleEventChange}
            >
              <option value="ON_DAY">On day</option>
              <option value="BEFORE_ONE_DAY">Before one day</option>
              <option value="BEFORE_THREE_DAYS">Before three days</option>
            </select>
          </div>
          <button
            type="button"
            onClick={addEvent}
            className="bg-gray-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Event
          </button>
        </div>

        {/* <div className="mb-4">
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
        </div> */}
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isEditing ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  <Footer />
    </div>
  );
}

export default AddEditProject;