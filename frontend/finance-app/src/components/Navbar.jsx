import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          FinanceManager
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">
            Home
          </Link>
          <Link to="/projects" className="text-white hover:text-blue-200">
            Projects
          </Link>
          <Link to="/events" className="text-white hover:text-blue-200">
            Events
          </Link>
          <Link to="/profile" className="text-white hover:text-blue-200">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
