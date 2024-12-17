import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../services/api";

const BookingForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    numberOfTravelers: 1,
    specialRequests: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ ...form, packageId: id });
      alert("Booking successful!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to book. Try again later.");
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Your Package</h1>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Travelers</label>
        <input
          type="number"
          name="numberOfTravelers"
          value={form.numberOfTravelers}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Special Requests</label>
        <textarea
          name="specialRequests"
          value={form.specialRequests}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
