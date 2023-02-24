import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../utils/Dropdown";

import Logo from "../images/ABG_logo.png";
function Header() {
  const trigger = useRef(null);

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-10 sm:px-5">
        <div className="flex items-center justify-between h-20">

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <Link to="/" className="block" aria-label="Cruip">
            <div class="rounded-full">
              <img
                class="w-12 h-12 fill-current text-purple-600"
                src={Logo}
                alt="Logo"
              ></img>
            </div>
            </Link>
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Tính năng
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Về chúng tôi
                </Link>
              </li>
              {/* 1st level: hover */}
              {/* <Dropdown title="Hỗ trợ"> */}
              {/* 2nd level: hover */}
              {/* <li>
                  <Link to="/contact" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Liên hệ với chúng tôi</Link>
                </li>
                <li>
                  <Link to="/help" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Trung tâm hỗ trợ</Link>
                </li>
                <li>
                  <Link to="/404" className="font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight">Báo lỗi</Link>
                </li> */}
              {/* </Dropdown> */}
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  to="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                >
                  Đăng ký
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
