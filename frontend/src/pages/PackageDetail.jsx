import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPackageById } from "../services/api";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const { data } = await fetchPackageById(id);
        setPkg(data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    getPackage();
  }, [id]);

  if (!pkg) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{pkg.title}</h1>
      <img src={pkg.image} alt={pkg.title} className="w-full h-64 object-cover my-4" />
      <p>{pkg.description}</p>
      <p className="text-lg font-bold mt-4">${pkg.price}</p>
      <a
        href={`/book/${pkg._id}`}
        className="inline-block mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Book Now
      </a>
    </div>
  );
};

export default PackageDetail;
