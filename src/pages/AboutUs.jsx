import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
const AboutUs = () => {
  return (
    <div>
      <Header />
      <div className="bg-img flex flex-col min-h-screen overflow-hidden bg-black rounded-lg">
        <div className="member-container flex-grow flex flex-wrap justify-center items-center">
          <div
            className="member text-black"
            style={{ transform: "rotate(0deg)", order: 1 }}
          >
            <h2>Nguyễn Hoàng Khang</h2>
            <p>Vị trí trong team: Leader, Back-End, DA </p>
          </div>
          <div
            className="member text-black"
            style={{ transform: "rotate(0deg)", order: 2 }}
          >
            <h2>Huỳnh Thị Kim Thoa</h2>
            <p>Vị trí trong team:Back-End, Front-End, BA </p>
          </div>
          <div
            className="member text-black"
            style={{ transform: "rotate(0deg)", order: 3 }}
          >
            <h2>Trần Minh Tùng</h2>
            <p>Vị trí trong team:Front-End </p>
          </div>
          <div
            className="member text-black"
            style={{ transform: "rotate(0deg)", order: 4 }}
          >
            <h2>Dương Tiến Vũ</h2>
            <p>Vị trí trong team:UX/UI, Front-End</p>
          </div>
        </div>
      </div>

      <Footer />
      <style>
        {`
          .member-container {
            margin: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .member {
            border: 1px solid black;
            padding: 10px;
            margin: 10px;
            background-color: #49b4f1;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            width: 300px;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h2 {
            font-size: 24px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            color: #f8dc23;
          }
          p {
            font-size: 18px;
            margin-bottom: 5px;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            color: #fff;
          }
          .bg-img {
            background-image: url("https://st.quantrimang.com/photos/image/2018/01/10/hinh-nen-4k-4.jpg");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            height: 100vh;
            width: 100%;
            position: relative;
            filter: brightness(80%);
          }
          .bg-img::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
