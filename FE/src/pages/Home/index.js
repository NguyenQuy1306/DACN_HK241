import { Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaCalendarCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoBookOutline, IoBookSharp } from "react-icons/io5";
import {
  MdChevronRight,
  MdOutlineLogout,
  MdOutlineLoyalty,
  MdStars,
} from "react-icons/md";
import LogoImage from "../../assets/images/logo.png";
import FilterItem from "../../components/FilterItem";
import Logo from "../../components/Logo";
import Search from "../../components/Search/SearchBar/SearchBar";
import CategoryItem from "../../features/Cetegogy/CategoryItem";
import RecommendCard from "../../features/RecommendRestaurant/RecommendCard";
import SlideCard from "../../features/Selections/components/SlideCard";
import HeaderInfo from "../../features/UserInfo/components/HeaderInfo";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { IoStorefrontOutline } from "react-icons/io5";
import "./Home.css";
import { CloseOutlined } from "@mui/icons-material";
import BookingHistory from "./../../features/BookingHistory/index";
import FavoriteList from "../../features/FavoriteCardList";
import ReviewList from "../../features/ReviewList";
import PersonalInfo from "../../features/PersonalInfo";

function Home(props) {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [navItem, setNavItem] = useState("booking");
  const [isScrolled, setIsScrolled] = useState(false);
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const showDrawer = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const onClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 555) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const carouselRef = React.useRef(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div>
      <Drawer
        onClose={onClose}
        width={302}
        closeIcon={childrenDrawer ? null : <CloseOutlined />}
        open={open}
        placement="right"
        style={{
          backgroundColor: "#F9FAFA",
          position: "fixed",
          top: 0,
          right: childrenDrawer ? 630 : 0,
        }}
      >
        <div className="user-info">
          <img
            className="user-avatar"
            alt="User"
            src={require("../../assets/images/avatar.png")}
          ></img>
          <div className="edit-avatar-icon">
            <FiEdit2 size={20} />
          </div>
        </div>
        <h3 className="user-name">Nhựt N.</h3>
        <p className="joined-time">Tham gia năm 2024</p>
        <ul className="user-menu">
          <li onClick={showChildrenDrawer} className="user-menu__item">
            <div className="menu-icon">
              <IoBookOutline size={24} />
            </div>
            <p onClick={() => setNavItem("booking")} className="menu-text">
              Lịch sử đặt bàn
            </p>
          </li>
          <li className="user-menu__item">
            <div className="menu-icon">
              <IoIosHeartEmpty size={28} />
            </div>
            <p onClick={() => setNavItem("favorite")} className="menu-text">
              Yêu thích
            </p>
          </li>
          <li className="user-menu__item">
            <div className="menu-icon">
              <TfiComment size={24} />
            </div>
            <p onClick={() => setNavItem("comment")} className="menu-text">
              Bình luận
            </p>
          </li>
          <li className="user-menu__item">
            <div className="menu-icon">
              <CiUser size={28} />
            </div>
            <p onClick={() => setNavItem("account")} className="menu-text">
              Thông tin tài khoản
            </p>
          </li>
          <li className="user-menu__item">
            <div className="menu-icon">
              <IoStorefrontOutline size={24} />
            </div>
            <p
              // onClick={setNavItem("register")}
              className="menu-text"
            >
              Đăng ký nhà hàng
            </p>
          </li>
          <li className="user-menu__item">
            <div className="menu-icon">
              <MdOutlineLogout size={24} />
            </div>
            <p className="menu-text">Đăng xuất</p>
          </li>
        </ul>
        <Drawer
          title=<CloseOutlined
            onClick={onChildrenDrawerClose}
            size={18}
            style={{
              position: "absolute",
              cursor: "pointer",
              right: 24,
              top: 16,
              boxShadow: "none",
            }}
          />
          width={816}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          style={{
            backgroundColor: "#FFF",
            boxShadow: "none",
            transition: "right 0.3s ease",
          }}
          mask={false}
        >
          {navItem === "booking" && <BookingHistory />}
          {navItem === "favorite" && <FavoriteList />}
          {navItem === "comment" && <ReviewList />}
          {navItem === "account" && <PersonalInfo />}
        </Drawer>
      </Drawer>
      <div className={`home-header ${isScrolled ? "hidden" : "visible"}`}>
        <Logo></Logo>
        <div style={{ cursor: "pointer" }} onClick={showDrawer}>
          <HeaderInfo
            userName="Nhựt"
            avatar={require("../../assets/images/avatar.png")}
          />
        </div>
      </div>
      <div className={`main-header ${isScrolled ? "visible" : "hidden"}`}>
        <img src={LogoImage} alt="TheMeal's logo" className="logo__image"></img>
        <Search />
        <div onClick={showDrawer}>
          <HeaderInfo avatar={require("../../assets/images/avatar.png")} />
        </div>
      </div>
      <div className="banner">
        <div>
          <p className="banner__title">
            Discover delicious dishes at your favorite restaurant <br></br>{" "}
            right now!
          </p>
          <Search border="none" />
        </div>
      </div>
      <div className="filter-list">
        <div className="filter-item">
          <FilterItem title="Khu vực" />
        </div>
        <div className="filter-item">
          <FilterItem title="Món chính" />
        </div>
        <div className="filter-item">
          <FilterItem title="Giá trung bình" />
        </div>
        <div className="filter-item">
          <FilterItem title="Loại nhà hàng" />
        </div>
        <div className="filter-item">
          <FilterItem title="Kiểu phục vụ" />
        </div>
        <div className="filter-item filter-item--btn ">
          <FilterItem
            style={{ backgroundColor: "#00665C", color: "#FFFFFF" }}
            icon={<CiFilter />}
            title="Lọc"
          />
        </div>
      </div>
      <p className="category-title">Danh Mục</p>
      <ul className="category-list">
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://bepmina.vn/wp-content/uploads/2021/11/cach-nau-lau-bo-nam-scaled.jpeg"
            name="Lẩu"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://media.mia.vn/uploads/blog-du-lich/quan-lau-mam-cay-dua-soc-trang-cung-mon-ngon-binh-dan-day-suc-hut-04-1664121177.jpeg"
            name="Buffet"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://sieungon.com/wp-content/uploads/2018/12/bi-quyet-uop-thi-nuong-ngon.jpg"
            name="Nướng"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://alltop.vn/backend/media/images/posts/2149/Nha_Hang_Chay_Moc_Mien-160520.jpg"
            name="Chay"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://webtiengtrung.com/wp-content/uploads/2018/07/tu-vung-ve-cac-loai-hai-san-trong-tieng-trung.jpg"
            name="Hải sản"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://statics.vinpearl.com/quan-nhau-can-tho-1_1632381868.jpg"
            name="Quán nhậu"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://dichoihanoi.com/wp-content/uploads/2019/08/quan-do-han-ha-noi-10.jpg"
            name="Quán Hàn"
          />
        </a>
        <a className="category-link" href="https://facebook.com">
          <CategoryItem
            imgUrl="https://digifood.vn/blog/wp-content/uploads/2021/07/nha-hang-nhat-trieu-viet-vuong-@ngocsfood.jpg"
            name="Quán Nhật"
          />
        </a>
      </ul>
      <div className="content">
        <div className="selections">
          <SlideCard
            title="Các nhà hàng đề xuất cho bạn"
            action="#"
            cardList={[
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
            ]}
          />
        </div>
        <div className="top-restaurant-banner">
          <div className="banner-content">
            <h2 className="banner-content__title">
              Khám phá Top 100 nhà hàng <br /> gần bạn
            </h2>
            <div className="banner-content__action">
              <a className="banner-link" href="https://thefork.com">
                Xem danh sách
              </a>
              <div style={{ marginTop: "4px" }}>
                <MdChevronRight />
              </div>
            </div>
          </div>
          <img
            src={require("../../assets/images/nha-hang-thien-anh-ha-long-3.jpg")}
            className="banner-img"
            alt="banner"
          ></img>
        </div>
        <div className="selections">
          <SlideCard
            title="Top nhà hàng nổi bật tại Hà Nội"
            actionTitle="Xem tất cả"
            action="#"
            cardList={[
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
            ]}
          />
        </div>
        <div className="selections">
          <SlideCard
            title="Top nhà hàng nổi bật tại Sài Gòn"
            actionTitle="Xem tất cả"
            action="#"
            cardList={[
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
              <RecommendCard
                imgUrl="https://statics.vincom.com.vn/xu-huong/0-0-0-0-0-nha-hang-hai-san-ha-noi/image18.png"
                address="HA NOI"
                tags={["XU HƯỚNG"]}
                name="THE MEAL LUXURY"
                point={9.2}
                category={["Hải sản, BBQ"]}
                avgPrice={120000}
                discountPercent={20}
              />,
            ]}
          />
        </div>
        <div className="business-model">
          <h4 className="business-model__title">Mô hình hoạt động?</h4>
          <ul className="characteristics">
            <li className="characteristic">
              <div className="characteristic-icon">
                <MdStars size={42} />
              </div>
              <h5 className="characteristic-content">Lựa chọn hàng đầu</h5>
              <p className="characteristic-description">
                Giải pháp chất lượng cho câu hỏi ăn gì ở đâu.
              </p>
            </li>
            <li className="characteristic">
              <div className="characteristic-icon">
                <IoIosStar size={42} />
                <IoIosStar size={42} />
                <IoIosStar size={42} />
              </div>
              <h5 className="characteristic-content">Khách hàng đánh giá</h5>
              <p className="characteristic-description">
                Đề xuất và đánh giá từ cộng đồng.
              </p>
            </li>
            <li className="characteristic">
              <div className="characteristic-icon">
                <MdOutlineLoyalty size={42} />
              </div>
              <h5 className="characteristic-content">Lợi ích độc quyền</h5>
              <p className="characteristic-description">
                Ưu đãi cho nhiều nhà hàng và nhiều lợi ích khác với chương trình
                khách hàng thân thiết của chúng tôi.
              </p>
            </li>
            <li className="characteristic">
              <div className="characteristic-icon">
                <FaCalendarCheck size={42} />
              </div>
              <h5 className="characteristic-content">Đặt bàn dễ dàng</h5>
              <p className="characteristic-description">
                Nhanh chóng, miễn phí, 24/7.
              </p>
            </li>
          </ul>
        </div>
        <div className="about">
          <h4 className="about__title">Về TheMeal</h4>
          <p className="about__content">
            TheMeal là nền tảng đặt chỗ và khám phá nhà hàng trực tuyến hàng đầu
            tại Việt Nam. Khám phá hơn 60.000 địa điểm ăn uống tuyệt vời nhất
            tại Hà Nội, Sài Gòn, Đà Nẵng, ​​Huế và nhiều nơi khác với danh mục
            nhà hàng phong phú của chúng tôi cho bất kỳ nhu cầu nào của bạn. Tìm
            kiếm tình trạng còn chỗ của nhà hàng bất kỳ lúc nào và với mức giá
            tốt nhất. Với hơn 20 triệu đánh giá đã xác minh để hướng dẫn bạn,
            bạn có thể khám phá nhà hàng hoàn hảo trên TheMeal. <br />
            <br /> Mỗi ngày và cho mọi dịp, bạn có thể tận hưởng mức giảm giá
            lên đến 50% cho hóa đơn thức ăn và cũng kiếm được điểm thưởng gọi là
            Yums, mà bạn có thể đổi tại các nhà hàng tham gia. <br />
            <br /> Bạn có muốn ăn bún chả ở Hà Nội, ​​đồ ăn Nhật ở Sài Gòn hay
            muốn khám phá một nhà hàng ẩm thực ở Huế không? Bạn có thích những
            quán ăn nhỏ kỳ quặc ở Đà Nẵng, háo hức với bữa sáng muộn Chủ Nhật ở
            Vũng Tàu hay đang tìm kiếm một tâm trạng lãng mạn ở Đà Lạt không?
            Hãy làm theo hướng dẫn và tìm những nhà hàng tuyệt vời nhất trên
            TheMeal!
          </p>
        </div>
        <div className="owner-side">
          <h4 className="owner-side__title">Bạn là chủ nhà hàng?</h4>
          <div className="owner-side__body">
            <img
              className="owner-img"
              alt="owner"
              src="https://amcollege.edu.vn/wp-content/uploads/2023/04/nghe-bartender-la-gi.jpg"
            ></img>
            <div className="owner-content">
              <div className="register">
                <h4 className="owner-content__title">
                  Đăng ký nhà hàng của bạn
                </h4>
                <p className="owner-content__description">
                  Giới thiệu về nhà hàng của bạn và chúng tôi sẽ liên lạc sớm
                  nhất có thể
                </p>
                <a href="https://thefork.com" className="owner-content__action">
                  XEM CHI TIẾT
                </a>
              </div>
              <div className="manager-login">
                <h4 className="owner-content__title">
                  Đã liên kết với TheMeal
                </h4>
                <p className="owner-content__description">
                  Đăng nhập ngay để quản lý nhà hàng của bạn{" "}
                </p>
                <a href="https://thefork.com" className="owner-content__action">
                  ĐĂNG NHẬP DÀNH CHO CHỦ NHÀ HÀNG{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
