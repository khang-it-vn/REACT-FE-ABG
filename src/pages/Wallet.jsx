import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Dropdown from "../utils/Dropdown";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";

function Wallet() {
  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showMpass, setShowMpass] = useState(false);
  const history = [
    {
      id: 1,
      value: "BTC",
    },
    {
      id: 2,
      value: "BTC",
    },
    {
      id: 3,
      value: "BTC",
    },
  ];
  const handleClick = () => {
    setShowForm(true);
    if (showMpass) return setShowMpass(false);
    if (showQR) return setShowQR(false);
  };
  const handleQRClick = () => {
    setShowMpass(false);
    setShowQR(true);

    if (showForm) return setShowForm(false);
  };
  const handleMpass = () => {
    setShowMpass(true);
  };

  const listItems = history.map;
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20 ">
              {/* Page header */}
              <h2 className="text-4xl text-white font-bold text-center">
                Trang giao dịch
              </h2>

              <div className="flex justify-center space-x-20 mt-10">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded"
                  onClick={handleClick}
                >
                  Chuyển
                </button>
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-1 rounded"
                  onClick={handleQRClick}
                >
                  Nhận
                </button>
                <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-1 rounded">
                  Lịch sử giao dịch
                </button>
              </div>
              <div className="max-w-sm mx-auto mt-10">
                {/* Form fields */}
                <form>
                  {showQR && (
                    <div className="max-w-sm mx-auto">
                      <div className="flex flex-col items-center justify-center my-4">
                        <QRCode value="https://example.com" />
                        <p className="text-white-500 text-sm mt-3">
                          Đây là địa chỉ ví của tôi
                        </p>
                      </div>
                    </div>
                  )}
                  {showForm && (
                    <div className="max-w-sm mx-auto">
                      <form>
                        <div className="flex flex-wrap -mx-3 mb-4">
                          <div className="w-full px-3">
                            <label
                              className="block text-gray-300 text-sm font-medium mb-1"
                              htmlFor="email"
                            >
                              Địa chỉ ví <span className="text-red-600"></span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              className="form-input w-full text-gray-300"
                              placeholder="Nhập địa chỉ ví"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                          <div className="w-full px-3">
                            <label className="block text-gray-300 text-sm font-medium mb-1">
                              Số tiền
                            </label>
                            <input
                              id="money"
                              type="text"
                              className="form-input w-full text-gray-300"
                              placeholder="Nhập số tiền cần chuyển"
                              onKeyPress={(e) => {
                                if (isNaN(parseInt(e.key))) {
                                  e.preventDefault();
                                }
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                          <label className="block text-gray-300 text-sm font-medium mb-1">
                            Nhập mPass
                          </label>
                          <div className="mt-2 flex">
                            {[...Array(6)].map((_, index) => (
                              <input
                                key={index}
                                type="tel"
                                maxLength="1"
                                className="w-10 h-10 text-center text-gray-700 border rounded-md mx-4"
                                onKeyPress={(e) => {
                                  if (isNaN(parseInt(e.key))) {
                                    e.preventDefault();
                                  }
                                }}
                                onInput={(e) => {
                                  const currentIndex = index;
                                  const nextInput = e.target.nextElementSibling;
                                  const prevInput =
                                    e.target.previousElementSibling;
                                  const { value, maxLength } = e.target;

                                  if (
                                    value &&
                                    value.length >= maxLength &&
                                    nextInput
                                  ) {
                                    nextInput.focus();
                                  } else if (!value && prevInput) {
                                    prevInput.focus();
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-10 rounded float-right"
                          onClick={handleMpass}
                        >
                          Thanh toán
                        </button>
                      </form>
                    </div>
                  )}
                </form>
                {/* <div className="flex flex-wrap -mx-2">
                  <ul>
                    <li>Thời gian: 25/03/2023</li>
                    <li>Giá trị: 100000000</li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Wallet;
