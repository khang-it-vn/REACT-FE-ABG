import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Footer from "../partials/Footer";
import {token, axiosClientJson} from '../http-config/axiosClient';

function Wallet() {
  

  // get history transfer
  const [historyStranfer, setHistoryStranfer] = useState(null);
  // get history receiver
  const [historyReceive, setHistoryReceive] = useState(null);
  // init var manage state show history transfer
  const [showStranferHistory, setShowStranferHistory] = useState(true);
  // init var manage address receiver
  const [addressReceiver, setAddressReceiver] = useState(null);
  // init var manage amount to sending
  const [amount, setAmount] = useState(0);
  // init var manange account receiver 
  const [accountReceiver, setAccountReceiver] = useState(null);
  // init var manage balance of account
  const [balance,setBalance] = useState(null);
  // init var manage user info
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  // init fee
  const [fees, setFees] = useState(null);
  // init var mpass
  const [mpass, handleMpassChange] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showMpass, setShowMpass] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // get history stranfer
  const getHistoryStranfer = async() => {
    const res = await axiosClientJson.get('getHistoryTransfer');
    console.log(res.data.transferDetails);
    setHistoryStranfer(res.data.transferDetails);
  }

  // get history receive
  const getHistoryReceive = async() => {
    const res = await axiosClientJson.get('getHistoryReceive');
    setHistoryReceive(res.data.transferDetails);
  }

  // check account from address

  // check account from address
  const checkAccountFromAddress = async () => {
    try{
      if (addressReceiver) {
        const res = await axiosClientJson.get('checkAccountFromAddress/' + addressReceiver);
        // check account from address
        if (res.status === 200) {
          console.log(res.data);
          setAccountReceiver(res.data);
        } else if (res.status === 400) {
          alert('not found');
          setAccountReceiver(null)
        } else if (res.status === 500) {
          alert('server error');
        }
      } else {
       
      }
    } catch (error) {
      setAccountReceiver(null);
    }
  }

  const getFee = async () => {
    try {
      const res = await axiosClientJson.get('getFees');
      setFees(res.data.fee);
    } catch (error) {
      console.log(error);
    }
  }

  const transferUSDT = async () => {
    try {
      const mpasstranfer = mpass.target.value;
      if(!accountReceiver || amount <= 0|| mpasstranfer.length != 6)
      {
        alert("Bạn cần điền địa chỉ và số tiền muốn chuyển. Và cần điền chính xác mpass")
        return;
      }
      const res = await axiosClientJson.post('transferUSDT',{
        toAddress: accountReceiver.address,
        amount: amount,
        mpass: mpasstranfer
      });

      if(res.status == 200)
      {
        alert("Chuyển thành công");
      }
      
    } catch (error) {
      if (error.response && error.response.status) {
        // Handle error with status code
        if (error.response.status === 403) {
          alert("Sai Mpass - Chuyển thất bại");
          return;
        }
      } else {
        // Handle error without status code
        alert("Bạn cần nhập địa chỉ chính xác");
      }
    
  }
}

  useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await axiosClientJson.get('getBalance');
        setBalance(res.data.balance);
        console.log(res.data); // added console.log to show res
      } catch (error) {
        console.log(error);
      }
    }
    getBalance();
    getHistoryStranfer();
    getHistoryReceive();
    getFee();
  },[])

  const setShow = (showForm, showMpass, showQR, showHistory) => {
    setShowForm(showForm);
    setShowMpass(showMpass);
    setShowQR(showQR);
    setShowHistory(showHistory);
  };

  const handleClick = () => setShow(true, false, false, false);

  const handleQRClick = () => setShow(false, false, true, false);

  const handleMpass = () => {
    transferUSDT();
  };

  const handleShowHistory = () => setShow(false, false, false, true);

  const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyText = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
    };
  };

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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient rounded-lg shadow-md p-8 mb-8">
                <div className="text-center md:text-left">
                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    Current balance
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-purple-600">
                    {balance ?? balance} USDT
                  </p>
                </div>
                <div className="text-center md:text-right mt-4 md:mt-0">
                  <p className="text-xl font-semibold text-gray-900 mb-4">
                    Total value
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-purple-600">
                    $15,000.00
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-20 mt-10">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded"
                  onClick={handleClick}
                >
                  Transfer
                </button>
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-1 rounded"
                  onClick={handleQRClick}
                >
                  Receive
                </button>
                <button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-1 rounded"
                  onClick={handleShowHistory}
                >
                  Transaction History
                </button>
              </div>
              <div className="max-w-1/2 mx-auto mt-10">
                {/* Form fields */}
                <form>
                  {/* Form show QR */}
                  {showQR && (
                    <div className="max-w-sm mx-auto">
                      <div className="flex flex-col items-center justify-center my-4">
                        <div className="bg-white p-4 rounded-md shadow-lg">
                          <div className="flex justify-content-center">
                          <QRCode
                            value={userInfo? userInfo.address: ''}
                            size={200}
                            fgColor="#000000"
                          />
                          </div>
                          <p className="text-red-700 text-base mt-3 font-medium text-center">
                          Address: {userInfo? userInfo.address: ''}
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            className="btn btn-primary mr-2 px-4 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
                            onClick={() =>
                              navigator.share({
                                url: "https://www.facebook.com/appleghostx",
                              })
                            }
                          >
                            Share
                          </button>
                          <button
                            className="btn btn-secondary px-4 py-2 rounded-md text-green-100 font-medium bg-green-600 hover:bg-green-500"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                userInfo.address
                              );
                              alert("Đã sao chép mã QR!");
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>


                  )}

                  {/* Form show nhập liệu */}
                  {showForm && (
                    <div className="max-w-sm mx-auto">
                      {
                        accountReceiver && (
                          <div className="col ">
                            <div className="row flex justify-content-center">
                              <img src={accountReceiver.avatar} alt="Image" />
                            </div>
                            <div className="row flex justify-content-center">
                              <p>{accountReceiver.fullname}</p>
                            </div>
                          </div>
                        )
                      }
                      <form className="w-full">
                        <div className="flex flex-wrap -mx-3 mb-4">
                          <div className="w-full px-3">
                            <label
                              className="block text-black-500 text-sm font-medium mb-1"
                              htmlFor="email"
                            >
                              Wallet address{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="email"
                              type=""
                              className="form-input w-full bg-white text-black-500 border border-gray-400 py-2 px-3 rounded focus:outline-none focus:border-blue-500"
                              placeholder="Enter wallet address"
                              value={addressReceiver}
                              onChange={(event) => {setAddressReceiver(event.target.value);}}
                              onBlur={() => checkAccountFromAddress()}


                              required
                              // onBlur={() => }
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                          <div className="w-full px-3">
                            <label className="block text-black-500 text-sm font-medium mb-1">
                              Amount of money{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              id="money"
                              type="number"
                              step={0.0001}
                              className="form-input w-full bg-white text-black-500 border border-gray-400 py-2 px-3 rounded focus:outline-none focus:border-blue-500"
                              placeholder="Enter the amount to be transferred"
                              value={amount}
                              onChange={(event) => { 
                                                      if(event.target.value > parseFloat(balance) )
                                                      {
                                                        alert("Vượt quá số dư");
                                                        return;
                                                      }
                                                      setAmount(event.target.value);
                                                    }
                                                  }
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                          <div className="w-full px-3">
                            <label className="block text-black-500 text-sm font-medium mb-1">
                              Phí{" "}
                            </label>
                            <input
                              id="money"
                              type="number"
                              step={0.0001}
                              className="form-input w-full bg-white text-black-500 border border-gray-400 py-2 px-3 rounded focus:outline-none focus:border-blue-500"
                              placeholder="Enter the amount to be transferred"
                              value={fees}
                              readOnly={true}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-2 mb-4">
                          <label className="block text-black-500 text-sm font-medium mb-1">
                            Enter mPass <span className="text-red-600">*</span>
                          </label>
                          <div className="mt-1 flex">

                            {[...Array(6)].map((_, index) => (
                              <input
                                key={index}
                                type="tel"
                                maxLength="1"
                                className="w-11 h-11 text-center text-gray-700 border rounded-md mx-3 focus:outline-none focus:border-blue-500 mpass-input"
                                onKeyPress={(e) => {
                                  if (isNaN(parseInt(e.key))) {
                                    e.preventDefault();
                                  }
                                }}
                              
                                onInput={(e) => {
                                  const currentIndex = index;
                                  const nextInput = e.target.nextElementSibling;
                                  const prevInput = e.target.previousElementSibling;
                                  const { value, maxLength } = e.target;

                                  if (value && value.length >= maxLength && nextInput) {
                                    nextInput.focus();
                                  } else if (!value && prevInput) {
                                    prevInput.focus();
                                  }

                                  const mpassValue = [...document.querySelectorAll('.mpass-input')]
                                    .map((input) => input.value)
                                    .join('');
                                    handleMpassChange({ target: { value: mpassValue } });
                                }}
                                
                              />
                            ))}
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-7 rounded float-right"
                          onClick={handleMpass}
                        >
                          Payment
                        </button>
                      </form>
                    </div>
                  )}
                  {/* Form show lịch sử */}
                  {showHistory && (
                    <div className="w-full h-full b">
                      <div className="my-10">
                        <div className="d-flex justify-content-between">
                            <div >
                                <h2 className="text-white-500 text-lg font-bold mb-5 btn btn-success" 
                                  onClick={() => setShowStranferHistory(true)}>
                                    Lịch sử gửi
                                </h2>
                            </div>
                            <div>
                                <h2 className="text-white-500 text-lg font-bold mb-5 btn btn-primary"
                                  onClick={() => setShowStranferHistory(false)}>
                                    Lịch sử nhận
                                </h2>
                            </div>
                        </div>


                       {
                        showStranferHistory  ? 
                        // start show transfer history 
                        (<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg sm:w-100">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ngày gửi
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Người nhận
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Số tiền
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Phí giao dịch
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {historyStranfer && historyStranfer.map((element, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {element.time_create}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {element.receiver.fullname}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {element.amount} USDT
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {element.tip} ETH
                                  </div>
                                </td>
                              </tr>
                            ))}


                          </tbody>
                        </table>
                        <ul class="pagination pagination-sm"> 
                          <li class="page-item disabled">
                            <a class="page-link" href="#" >1</a>
                          </li>
                        </ul>
                      </div>)
                      // end show transfer history
                       :
                      // start show receive history
                      ( <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg sm:w-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Ngày nhận
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Người gửi
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Số tiền
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Phí giao dịch
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {historyReceive && historyReceive.map((element, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {element.time_create}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {element.sender.fullname}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {element.amount} USDT
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {element.tip} ETH
                                </div>
                              </td>
                            </tr>
                          ))}


                        </tbody>
                      </table>
                    
                        <ul class="pagination pagination-sm"> 
                          <li class="page-item disabled">
                            <a class="page-link" href="#" >1</a>
                          </li>
                        </ul>


                     
                    </div>)
                    // end show receive history
                       }
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Wallet;