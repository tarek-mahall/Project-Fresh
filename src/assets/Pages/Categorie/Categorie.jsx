import { useEffect, useState } from "react";
import "animate.css";
import { Helmet } from "react-helmet";

export default function Categorie() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-8">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="w-4/5  mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {categories.map((category) => (
            <div
              key={category._id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center p-4">
                <p className="text-white text-lg font-semibold text-center">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
