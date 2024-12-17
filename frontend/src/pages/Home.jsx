import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPackages } from "../services/api";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();



  const handleAdminClick = () => {
    navigate("/admin-login");
  };


  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await fetchPackages();
        setPackages(data);
      } catch (error) {
        console.error("bruh Error fetching packages:", error);
      }
    };
    getPackages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">  
        <h1 className="text-2xl font-bold mb-4">Available Tour Packages</h1>
        <button onClick={handleAdminClick} className="bg-blue-500 py-2 px-4 rounded">
          Admin
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded-lg shadow">
            <img src={pkg.image} alt={pkg.title} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{pkg.title}</h2>
            <p className="text-gray-600">{pkg.description}</p>
            <p className="font-bold mt-2">${pkg.price}</p>
            <a
              href={`/packages/${pkg._id}`}
              className="block mt-4 bg-blue-500 text-white py-2 px-4 rounded text-center"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
