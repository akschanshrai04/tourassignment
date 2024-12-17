import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const url = "https://tour-assignment.onrender.com";
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null); 
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });
  const [filters, setFilters] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Unauthorized access! Please log in as admin.");
      navigate("/admin-login"); 
      return;
    }

    fetchPackages(token);
    fetchBookings(token);
  }, [filters]);


  const fetchBookings = async (token) => {
    try {
      const { data } = await axios.get(`${url}/api/admin/bookings` , {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
      });
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchPackages = async (token) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.title) queryParams.append("title", filters.title);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
      console.log(queryParams.toString())
      const { data } = await axios.get(`${url}/api/admin/allpackages?${queryParams.toString()}` , {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
      });
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };


  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAddOrEditPackage = async (e) => {
    e.preventDefault();
    try {
      const availableDatesArray = packageData.availableDates
        .split(",")
        .map((date) => date.trim());

      if (editingPackage) {
        await axios.put(
          `${url}/api/admin/packages/${editingPackage._id}`,
          { ...packageData, availableDates: availableDatesArray }
        );
        alert("Package updated successfully!");
      } else {
        await axios.post(`${url}/api/admin/packages`, {
          ...packageData,
          availableDates: availableDatesArray,
        });
        alert("Package added successfully!");
      }

      setShowForm(false);
      setEditingPackage(null);
      setPackageData({ title: "", description: "", price: "", availableDates: "", image: "" });
      fetchPackages(); 
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setPackageData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      availableDates: pkg.availableDates.join(", "), 
      image: pkg.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/admin/packages/${id}`);
      fetchPackages(); 
      alert("Package deleted successfully!");
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          placeholder="Filter by title"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="p-2 border rounded"
        />
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="title:asc">Title: A to Z</option>
          <option value="title:desc">Title: Z to A</option>
        </select>
        </div>
        <button className="bg-blue-500 py-2 px-4 rounded" onClick = {handlelogout}> Home </button>
      </div>
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) {
            setEditingPackage(null);
            setPackageData({ title: "", description: "", price: "", availableDates: "", image: "" });
          }
        }}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        {showForm ? "Close Form" : editingPackage ? "Edit Package" : "Add New Package"}
      </button>

      {showForm && (
        <form onSubmit={handleAddOrEditPackage} className="border p-4 mb-4">
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={packageData.title}
              onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={packageData.description}
              onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              value={packageData.price}
              onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Available Dates (comma-separated)</label>
            <input
              type="text"
              value={packageData.availableDates}
              onChange={(e) => setPackageData({ ...packageData, availableDates: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="e.g., 2024-12-20, 2025-01-05"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              value={packageData.image}
              onChange={(e) => setPackageData({ ...packageData, image: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            {editingPackage ? "Update Package" : "Add Package"}
          </button>
        </form>
      )}

      <section>
        <h2 className="text-xl font-bold mb-2">Manage Packages</h2>
        <ul>
          {packages.map((pkg) => (
            <li key={pkg._id} className="border p-2 mb-2">
              <p>{pkg.title}</p>
              <button
                onClick={() => handleEdit(pkg)}
                className="text-yellow-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-2">View Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-2 mb-2">
              <p>Customer: {booking.customerName}</p>
              <p>Package: {booking.package?.title}</p>
              <p>Travelers: {booking.numberOfTravelers}</p>
              <p>Total: ${booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
