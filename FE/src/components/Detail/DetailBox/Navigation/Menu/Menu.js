import React, { useState } from "react";
import "./Menu.css";
import CardMenuAvailable from "./Component/CardMenuAvailable/CardMenuAvailable";
import ButtonMenuNavBar from "./Component/ButtonMenuNavBar/ButtonMenuNavBar";
const Menu = ({ selectedPlace }) => {
  const menuAvailable = [
    {
      name: "Instant MICHELIN",
      price: 69,
      availability: "Available from Jan 05 to Jan 05",
      type: "Temporary",
      details: [],
    },
    {
      name: "Menu Signature 6 temps",
      price: 95,
      availability: "Permanent TheFork offer",
      type: "Permanent",
      details: [
        "Amuse bouche",
        "Appetizer",
        "Plat de poisson",
        "Plat de viande",
        "Fromage",
        "Dessert",
      ],
    },
    {
      name: "Menu Découverte",
      price: 39,
      availability: "Permanent TheFork offer",
      type: "Permanent",
      details: [],
    },
  ];
  const allFoodUrl = [
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-1-jpg-normal-25762204150.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-2-jpg-normal-25762205151.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-3-jpg-normal-25762206152.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-4-jpg-normal-25762207153.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-5-jpg-normal-25762208154.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-6-jpg-normal-25762209155.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-7-jpg-normal-25762210156.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-8-jpg-normal-25762211157.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-9-jpg-normal-25762212158.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-10-jpg-normal-25762213159.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-11-jpg-normal-25762214160.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-12-jpg-normal-25762215161.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-13-jpg-normal-25762216162.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-14-jpg-normal-25762217163.webp",
    "https://pasgo.vn/Upload/anh-chi-tiet-bang-gia/nha-hang-din-ky-cu-lao-xanh-15-jpg-normal-25762218164.webp",
  ];
  const [onClickMenuNavBar1, setOnClickMenuNavBar1] = useState(true);
  const [onClickMenuNavBar2, setOnClickMenuNavBar2] = useState(false);
  const [onClickMenuNavBar3, setOnClickMenuNavBar3] = useState(false);
  const handleOnClickImageMenu = () => {};
  return (
    <>
      <div className="MenuNavBarDiv">
        <div className="MenuNavBarDiv_H1">
          <div className="MenuNavBarDiv_H1_H2">
            <ButtonMenuNavBar
              text={"Các combo có sẵn"}
              clicked={onClickMenuNavBar1}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            ></ButtonMenuNavBar>
            <ButtonMenuNavBar
              text={"Tất cả món ăn"}
              clicked={onClickMenuNavBar2}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            ></ButtonMenuNavBar>
            <ButtonMenuNavBar
              text={"Tạo combo mới"}
              clicked={onClickMenuNavBar3}
              setOnClickMenuNavBar1={setOnClickMenuNavBar1}
              setOnClickMenuNavBar2={setOnClickMenuNavBar2}
              setOnClickMenuNavBar3={setOnClickMenuNavBar3}
            ></ButtonMenuNavBar>
          </div>
        </div>
      </div>
      {onClickMenuNavBar1 && (
        <div className="MenuNavBar_menu">
          <div className="MenuNavBar_menu_H1">
            <h3 className="MenuNavBar_menu_H1_h3">
              <span>Các combo hiện có</span>
            </h3>
            <p className="MenuNavBar_menu_H1_p">
              <span>
                Khám phá thực đơn lựa chọn của đầu bếp với nhiều món ăn đa dạng
                với mức giá cố định. Một số có thể đặt qua TheFork, trong khi
                những món khác có thể tạo combo hoặc sẵn tại chỗ.
              </span>
            </p>
            {menuAvailable.map((menu, index) => (
              <CardMenuAvailable key={index} menu={menu}></CardMenuAvailable>
            ))}
          </div>
        </div>
      )}
      {onClickMenuNavBar2 && (
        <div className="MenuNavBar_allfood">
          {allFoodUrl.map((menuImage, index) => {
            if (index < 8) {
              return (
                <div key={index} className="col-md-4 ImageAllFoodDiv">
                  <img
                    src={menuImage}
                    alt={`Menu ${index + 1}`}
                    className="ImageAllFoodDiv_img"
                  />
                </div>
              );
            } else if (index === 8) {
              return (
                <div key={index} className="col-md-4 ImageAllFoodDiv">
                  <div className="ImageAllFoodDiv_number8">
                    {" "}
                    <div className="ImageAllFoodDiv_number8_H1">
                      <div className="ImageAllFoodDiv_number8_H1_div">+8</div>
                    </div>
                    <img
                      src={menuImage}
                      alt={`Menu ${index + 1}`}
                      className="ImageAllFoodDiv_img"
                    />
                  </div>
                </div>
              );
            }
            return null; // In case you want to return nothing after index 8
          })}
        </div>
      )}
    </>
  );
};

export default Menu;
