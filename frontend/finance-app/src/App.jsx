import {Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import DashboardList from "./components/DashboardList";
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import AddEditProject from "./components/AddEditProject";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import AddProject2 from "./components/AddProject2";
import Home from "./components/Home";
import EventsPage from "./components/EventsPage";
import EditEvent from "./components/EditEvent";
import Account from "./components/AccountPage";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddEditProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardlist" element={<DashboardList />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/events" element={<EventsPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddEditProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/account" element={<Account />} />
        
        
      </Routes>
    </div>
  );
}

export default App;
