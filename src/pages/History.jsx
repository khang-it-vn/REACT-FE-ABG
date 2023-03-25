import React from "react";
import { Link } from "react-router-dom";

import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";

function History() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100">
      {/* Site header */}
      <Header />
        {/* Page content */}
  <main className="flex-grow">
    {/* Page illustration */}
    <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
      <PageIllustration />
    </div>

    {/* Wallet section */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-40 pb-12 md:pb-20">
      {/* Wallet header */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-8">Lịch sử giao dịch</h1>
      
      {/* Wallet balance */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="text-center md:text-left">
          <p className="text-xl font-semibold text-gray-900 mb-4">Số dư hiện tại</p>
          <p className="text-3xl md:text-4xl font-bold text-purple-600">$10,000.00</p>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-xl font-semibold text-gray-900 mb-4">Tổng giá trị</p>
          <p className="text-3xl md:text-4xl font-bold text-purple-600">$15,000.00</p>
        </div>
      </div>

      {/* Wallet transaction history */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lịch sử giao dịch</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-gray-200 py-4">
          <div className="text-gray-900 mb-2 md:mb-0">Mua ETH</div>
          <div className="text-gray-700">$1,000.00</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-gray-200 py-4">
          <div className="text-gray-900 mb-2 md:mb-0">Bán BTC</div>
          <div className="text-gray-700">$2,500.00</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-gray-200 py-4">
          <div className="text-gray-900 mb-2 md:mb-0">Mua LTC</div>
          <div className="text-gray-700">$500.00</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-gray-200 py-4">
          <div className="text-gray-900 mb-2 md:mb-0">Mua BTC</div>
          <div className="text-gray-700">$2,000.00</div>
        </div>
      </div>
    </section>
  </main>
</div>
  );
}
export default History;
