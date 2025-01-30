import {Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import AddEditProject from "./components/AddEditProject";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
