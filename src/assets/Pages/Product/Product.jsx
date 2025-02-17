import { useEffect, useState } from "react";
import "animate.css";
import { Helmet } from "react-helmet";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-8">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="w-4/5 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mt-4">${product.price}</p>
              </div>
              <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
