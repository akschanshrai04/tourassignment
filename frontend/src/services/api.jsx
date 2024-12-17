import axios from "axios";
// const url = "https://tour-assignment.onrender.com";

const API = axios.create({
  baseURL: "https://tour-assignment.onrender.com/api", 
});

export const fetchPackages = () => API.get("/packages");
export const fetchPackageById = (id) => API.get(`/packages/${id}`);
export const createBooking = (bookingData) => API.post("/bookings", bookingData);
