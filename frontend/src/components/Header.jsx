import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin-login");
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-lg font-bold">Travel Agency</h1>
      <button onClick={handleAdminClick} className="bg-blue-500 py-2 px-4 rounded">
        Admin
      </button>
    </header>
  );
};

export default Header;
