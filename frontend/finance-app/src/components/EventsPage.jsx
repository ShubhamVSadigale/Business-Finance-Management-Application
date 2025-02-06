import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

function EventsPage() {
  //const [project, setProject] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects/upcoming-events")
      .then((response) => {
        console.log("API Response:", response.data);
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load events.");
        setLoading(false);
        console.error("Error fetching events:", error);
      });
  }, []);

  if (loading) return <div className="text-center text-lg">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
        <ul className="space-y-6">
          {events.length > 0 ? (
            events.map((event) => (
              <li
                key={event.id}
                className="border rounded-lg p-6 shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out"
              >
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-sm text-gray-600 flex items-center mb-4">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                {event.description && (
                  <p className="text-gray-700 mb-4">{event.description}</p>
                )}
                <div>
                  {showEditButton && (
                    <Link
                      to={`/edit-event/${event.id}`}
                      className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200 ease-in-out"
                    >
                      Edit Event
                    </Link>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No upcoming events.</p>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default EventsPage;
