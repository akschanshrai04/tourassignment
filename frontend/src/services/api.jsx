import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export const fetchPackages = () => API.get("/packages");
export const fetchPackageById = (id) => API.get(`/packages/${id}`);
export const createBooking = (bookingData) => API.post("/bookings", bookingData);
