import { useState, useEffect } from "react";

import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import { token, axiosClientJson } from "../http-config/axiosClient";

function NFTMarket() {
  const [products, setProducts] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axiosClientJson.get("user/products");
      setProducts(res.data);
    };
    const getBalance = async () => {
      const res = await axiosClientJson.get("getBalance");
      setBalance(parseFloat(res.data.balance));
    };

    getProducts();
    getBalance();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        {/* Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        {/* Wallet section */}
        <section className="w-3/4 mx-auto px-4 sm:px-6 pt-24 md:pt-40 pb-12 md:pb-20">
          <div className="display-4 text-center mb-5">NFT market</div>
          <div className="grid grid-cols-4 gap-4">
            {products &&
              products.map((item, index) => (
                <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src={"http://localhost:3000/img/" + item.image}
                    alt={item.image}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-center mt-2 font-semibold text-gray-900 text-lg">
                    {item.name}
                  </div>
                  <div className="flex justify-between items-center mt-2 font-semibold text-gray-900 text-xl w-full ">
                    <div className="mr-2 text-red">{item.price} USDT</div>
                    <button className="bg-blue-500 text-white font-semibold py-2 rounded-lg btn btn-danger">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <ul class="pagination pagination-sm">
            <li class="page-item disabled">
              <a class="page-link" href="#">
                1
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default NFTMarket;
