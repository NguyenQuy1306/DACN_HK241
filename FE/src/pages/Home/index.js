import { Client } from "@stomp/stompjs";
import { Button, message, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaCalendarCheck } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { MdChevronRight, MdOutlineLoyalty, MdStars } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import FilterItem from "../../components/FilterItem";
import ModalRePayment from "../../components/Modal/ModalRePayment/ModalRePayment";
import Search from "../../components/Search/SearchBar/SearchBar";
import CategoryItem from "../../features/Cetegogy/CategoryItem";
import RecommendCard from "../../features/RecommendRestaurant/RecommendCard";
import SlideCard from "../../features/Selections/components/SlideCard";
import {
  setLoginRoute,
  setStatusModalAuthentication,
  setUser,
  setUserRole,
} from "../../redux/features/authenticationSlice";
import { paymentCallback } from "../../redux/features/paymentSlice";
import { saveMyCoords } from "../../redux/features/persistSlice";
import "./Home.css";
import { getAllRestaurant } from "../../redux/api";
import { BACKEND_URL, AI_URL } from "../../utils/util";
function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);

  // State consolidation
  const [state, setState] = useState({
    pendingPayment: null,
    itemWidth: 0,
    testScroll: 0,
    startIndex: 0,
    childrenDrawer: false,
    isScrolled: false,
    previousState: false,
    nextState: false,
    openModal: false,
    isLoading: true,
  });

  // Data state
  const [stompClient, setStompClient] = useState(null);
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [categories, setCategories] = useState([]);

  // Refs
  const categoryRef = useRef();
  const carouselRef = useRef(null);

  // Helper function to update state partially
  const updateState = (newState) =>
    setState((prev) => ({ ...prev, ...newState }));

  // WebSocket connection setup
  useEffect(() => {
    const socket = new SockJS(`${BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { withCredentials: true },
      onConnect: () => setStompClient(client),
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      debug:
        process.env.NODE_ENV === "development"
          ? (str) => console.log(str)
          : false,
    });

    client.activate();
    return () => client && client.deactivate();
  }, []);

  // Get user geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => dispatch(saveMyCoords(position.coords)),
      (error) => console.error("Error fetching geolocation:", error)
    );
  }, [dispatch]);

  // Fetch all restaurants
  useEffect(() => {
    const fetchAllRestaurant = async () => {
      try {
        const response = await getAllRestaurant();
        setAllRestaurant(response.payload);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchAllRestaurant();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/restaurant-categories`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch recommendations based on user
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!allRestaurant.length) return;

        let response;
        if (!user) {
          response = await axios.get(
            `${BACKEND_URL}/api/restaurants/recommended`,
            {
              withCredentials: true,
            }
          );
          setRecommendList(response.data);
        } else {
          // message.success("User detected, fetching recommendations...");

          response = await axios.get(
            `${AI_URL}/recommend/online?user_id=${user.maSoNguoiDung}&top_n=10`
          );

          // message.success("Recommendations fetched successfully");
          console.log("Recommendations response:", response.data);
          const filteredRecommendations = allRestaurant.filter((item) =>
            response.data.recommendations.includes(item.maSoNhaHang)
          );
          setRecommendList(filteredRecommendations);
        }
      } catch (error) {
        message.error("Failed to fetch recommendations, catch error");

        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [user, allRestaurant]);

  // Check for pending payments
  useEffect(() => {
    const checkPendingPayment = () => {
      const pendingOrderString = localStorage.getItem("pendingOrder");
      if (!pendingOrderString) return;

      const pendingOrder = JSON.parse(pendingOrderString);
      const elapsedTime = Date.now() - pendingOrder.timeStamp;

      if (elapsedTime >= 180000) {
        localStorage.removeItem("pendingOrder");
        dispatch(
          paymentCallback({
            status: "FAIL",
            orderCode: pendingOrder.orderCode,
            paymentCode: pendingOrder.orderCodePayOs,
          })
        );
        sendMessage();
      } else {
        updateState({
          pendingPayment: pendingOrder,
          openModal: true,
        });
      }
    };

    checkPendingPayment();
  }, [dispatch]);

  // Scroll event listener for header behavior
  useEffect(() => {
    const handleScroll = () => {
      updateState({ isScrolled: window.scrollY > 555 });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate item width for category scrolling
  useEffect(() => {
    if (categoryRef.current?.firstChild) {
      const firstItem = categoryRef.current.firstChild;
      updateState({ itemWidth: firstItem.getBoundingClientRect().width });
    }
  }, [categories]);

  // Handle category scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (!categoryRef.current) return;

      updateState({
        previousState: categoryRef.current.scrollLeft !== 0,
        nextState:
          categoryRef.current.scrollLeft + categoryRef.current.clientWidth <
          categoryRef.current.scrollWidth,
      });
    };

    const refCurrent = categoryRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);
    return () => refCurrent?.removeEventListener("scroll", handleScroll);
  }, []);

  // SSO authentication handling
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("userId");

        if (!userId) {
          updateState({ isLoading: false });
          return;
        }

        dispatch(setStatusModalAuthentication({ openModal: false }));

        const response = await fetch(
          `${BACKEND_URL}/user-info?userId=${userId}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        dispatch(setUser(data));

        const roleMap = {
          C: "customer",
          O: "owner",
        };

        dispatch(setUserRole(roleMap[data.userRole] || "guest"));

        if (data.userRole === "O") {
          dispatch(setLoginRoute(true));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        updateState({ isLoading: false });
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  // Event handlers
  const sendMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/sendMessage",
        body: "Hello Websocket",
      });
    }
  };

  const handleNext = () => {
    if (categoryRef.current) {
      updateState({ testScroll: categoryRef.current.scrollLeft });
      categoryRef.current.scrollBy({
        left: state.itemWidth + 16,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (categoryRef.current) {
      updateState({ testScroll: categoryRef.current.scrollLeft });
      categoryRef.current.scrollBy({
        left: -(state.itemWidth + 16),
        behavior: "smooth",
      });
    }
  };

  const handleCloseModal = () => updateState({ openModal: false });

  const handleContinuePayment = () => {
    if (state.pendingPayment) {
      window.location.href = state.pendingPayment.checkoutUrl;
    }
  };

  const carouselControls = {
    next: () => carouselRef.current?.next(),
    prev: () => carouselRef.current?.prev(),
  };

  if (state.isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div className={`home-header ${state.isScrolled ? "hidden" : "visible"}`}>
        <Search></Search>
      </div>
      <div className={`main-header ${state.isScrolled ? "visible" : "hidden"}`}>
        <Search></Search>
      </div>
      <div className="banner">
        <div>
          <p className="banner__title">
            Discover delicious dishes at your favorite restaurant <br></br>{" "}
            right now!
          </p>
        </div>
      </div>
      {/* <div className="filter-list">
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
                <div className="filter-item">
                    <FilterItem title="Đánh giá" />
                </div>
                <div className="filter-item">
                    <FilterItem title="Thời gian" />
                </div>
                <div className="filter-item filter-item--btn ">
                    <FilterItem
                        style={{ backgroundColor: "#00665C", color: "#FFFFFF" }}
                        icon={<CiFilter />}
                        title="Lọc"
                    />
                </div>
            </div> */}
      <p className="category-title">Danh Mục</p>
      <ul ref={categoryRef} className="category-list">
        {categories.map((cate, index) => {
          return (
            <div key={index} className="category-link">
              <CategoryItem imgUrl={cate.linkAnh} name={cate.ten} />
            </div>
          );
        })}
        <Tooltip className="left-nav-btn" title="previous">
          <Button
            onClick={handlePrevious}
            shape="circle"
            disabled={!state.previousState}
            icon={<FaAngleLeft />}
          />
        </Tooltip>
        <Tooltip className="right-nav-btn" title="next">
          <Button
            onClick={handleNext}
            shape="circle"
            icon={<FaAngleRight />}
            disabled={
              categoryRef.current?.scrollLeft +
                categoryRef.current?.clientWidth >=
              categoryRef.current?.scrollWidth
            }
          />
        </Tooltip>
      </ul>
      <div className="content">
        <div className="selections">
          <SlideCard
            title="Các nhà hàng đề xuất cho bạn"
            action="#"
            cardList={recommendList.map((card, index) => {
              return (
                <RecommendCard
                  tags={["XU HƯỚNG"]}
                  key={index}
                  point={5}
                  place={card}
                  discountPercent={20}
                />
              );
            })}
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
            cardList={recommendList.map((res, index) => {
              return (
                <RecommendCard
                  key={index}
                  tags={["XU HƯỚNG"]}
                  point={9.2}
                  place={res}
                  discountPercent={20}
                />
              );
            })}
          />
        </div>
        <div className="selections">
          <SlideCard
            title="Top nhà hàng nổi bật tại Sài Gòn"
            actionTitle="Xem tất cả"
            action="#"
            cardList={recommendList.map((res, index) => {
              return (
                <RecommendCard
                  key={index}
                  tags={["XU HƯỚNG"]}
                  point={9.2}
                  discountPercent={20}
                  place={res}
                />
              );
            })}
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
      <ModalRePayment
        open={state.openModal}
        handleClose={handleCloseModal}
        pendingPayment={state.pendingPayment}
        handleContinuePayment={handleContinuePayment}
      ></ModalRePayment>
    </div>
  );
}

export default Home;
