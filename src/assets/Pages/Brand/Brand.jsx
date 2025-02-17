import axios from "axios";
import { useEffect, useState } from "react";

export default function BrandList() {
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="w-4/5 container mx-auto my-16">
      <h2 className="capitalize text-3xl font-bold mb-6 flex gap-5 items-center justify-center">
        <p>Brands</p>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center p-4 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              src={brand.image}
              className="h-20 object-contain mb-4"
              alt={brand.name}
            />
            <p className="text-center text-sm font-semibold text-gray-700 group-hover:text-blue-600">
              {brand.name}
            </p>
            <div className="absolute inset-0 rounded-2xl bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
