import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AddProject() {
  const [project, setProject] = useState({
    id: "P" + Date.now(),
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planning",
    events: [],
  });
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    notificationPreference: "ON_DAY",
  });
  const navigate = useNavigate();

  const handleProjectChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value});
  };

  const handleEventChange = (e) => {
    setCurrentEvent({...currentEvent, [e.target.name]: e.target.value});
  };

  //   const addEvent = (e) => {
  //     e.preventDefault();
  //     setProject({
  //       ...project,
  //       events: [...project.events, {...currentEvent, eventId: Date.now()}],
  //     });
  //     setCurrentEvent({
  //       title: "",
  //       description: "",
  //       eventDate: "",
  //       notificationPreference: "ON_DAY",
  //     });
  //   };

  const addEvent = (e) => {
    e.preventDefault();
    setProject({
      ...project,
      events: [
        ...project.events,
        {
          ...currentEvent,
          id: "E" + Date.now(),
          projectId: project.id,
          eventDate: generateDateTimeWithDefaultTime(currentEvent.eventDate),
        },
      ],
    });
    setCurrentEvent({
      title: "",
      description: "",
      eventDate: "",
      notificationPreference: "ON_DAY",
    });
  };

  const removeEvent = (eventId) => {
    setProject({
      ...project,
      events: project.events.filter((event) => event.eventId !== eventId),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    project.startDate = generateDateTimeWithDefaultTime(project.startDate);
    project.endDate = generateDateTimeWithDefaultTime(project.endDate);

    console.log("New Project data:", project);
    // Here you would typically send the data to your backend
    axios
      .post("http://localhost:8080/api/projects", project, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Project data updated!");
      })
      .catch((err) => {
        console.log(err);
        console.log(project);
      });

    navigate("/dashboard");
  };

  function generateDateTimeWithDefaultTime(dateString) {
    const [year, month, day] = dateString.split("-");
    const targetDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0, 0)); // Month is 0-indexed
    // return targetDate.toISOString().replace(/\.000Z$/, "Z"); // remove milliseconds
    return targetDate.toISOString(); // remove milliseconds
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            Project Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            name="id"
            value={project.id}
            onChange={handleProjectChange}
            required
          />
        </div> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Project Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={project.title}
            onChange={handleProjectChange}
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
            value={project.description}
            onChange={handleProjectChange}
            rows="4"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleProjectChange}
              required
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleProjectChange}
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
            value={project.status}
            onChange={handleProjectChange}
            required
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Events</h2>
        {project.events.map((event, index) => (
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
              <option value="BEFORE_ONE_DAY">Before on day</option>
              <option value="BEFORE_THREE_DAYS">Before three days</option>
            </select>
          </div>
          <button
            type="button"
            onClick={addEvent}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Event
          </button>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
