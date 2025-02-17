import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    setWishlist((prev) => ({ ...prev, [product.id]: !prev[product.id] }));
  };

  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="w-4/5 flex flex-wrap mx-auto">
      {products.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
          <div className="border rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 relative hover:shadow-2xl hover:scale-105 hover:-translate-y-1">
            <button
              onClick={(event) => toggleWishlist(event, product)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-2 shadow-md"
            >
              {wishlist[product.id] ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
            </button>
            <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover" />
            <small className="ps-3 block mt-2 text-gray-500">{product.category?.name}</small>
            <h3 className="ps-3 text-lg font-semibold truncate">{product.title}</h3>
            <div className="px-3 flex justify-between items-center">
              <p className="text-gray-600">{product.price} EGP</p>
              <div className="flex items-center">
                <p className="text-gray-600 me-2">{product.ratingsAverage}</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm ${
                      star <= Math.round(product.ratingsAverage) ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="px-3 pb-2 flex justify-between items-center">
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-blue-500 hover:underline"
              >
                Learn More
              </button>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
