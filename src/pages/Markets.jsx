import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "axios";
import ReactPaginate from "react-paginate";
const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(markets.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://api.binance.com/api/v3/ticker/24hr`);
      setMarkets(result.data);
    };
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="my-10">
        <div className="my-4 mb-10">
          <h1 className="text-white-500 text-2xl font-bold my-10 mb-5">Markets</h1>
          <table className="w-full border-collapse border-gray-300">
            <thead className="bg-white">
              <tr className="bg-gray-600 ">
                <th className="p-3 text-left text-center text-emerald-400">Symbol</th>
                <th className="p-3 text-left text-center text-red-500">Last Price</th>
                <th className="p-3 text-left text-center">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {markets
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((market) => (
                  <tr key={market.symbol} className="border-b border-gray-300">
                    <td className="p-3">{market.symbol}</td>
                    <td className="p-3">{market.lastPrice.toLocaleString()}</td>
                    <td
                      className={`p-3 ${
                        market.priceChangePercent > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {market.priceChangePercent > 0 ? (
                        <span>&#8593; {market.priceChangePercent}%</span>
                      ) : (
                        <span>
                          &#8595; {Math.abs(market.priceChangePercent)}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Markets;
