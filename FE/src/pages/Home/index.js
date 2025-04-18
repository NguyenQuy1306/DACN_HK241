import { Client } from "@stomp/stompjs";
import { Button, Tooltip } from "antd";
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
    logout,
    setLoginRoute,
    setStatusModalAuthentication,
    setUser,
    setUserRole,
} from "../../redux/features/authenticationSlice";
import { paymentCallback } from "../../redux/features/paymentSlice";
import { saveMyCoords } from "../../redux/features/persistSlice";
import "./Home.css";
import { getAllRestaurant } from "../../redux/api";
const { calculateDistance } = require("../../helper/caculateDistance");

function Home(props) {
    const [pendingPayment, setPendingPayment] = useState(null);
    const categoryRef = useRef();
    const [itemWidth, setItemWidth] = useState(0);
    const categoryItemPerPage = 9;
    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate();
    const [testScroll, setTestScroll] = useState(0);
    const [recommendList, setRecommendList] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [allRestaurant, setAllRestaurant] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [previousState, setPreviousState] = useState(false);
    const [nextSate, setNextState] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const myCoords = useSelector((state) => state.persist.myCoords);
    const { user } = useSelector((state) => state.authentication);

    const dispatch = useDispatch();
    useEffect(() => {
        // Khởi tạo kết nối WebSocket khi component mount
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: { withCredentials: true }, // Sử dụng SockJS làm transport
            onConnect: () => {
                setStompClient(client);
                // alert("Connecting to  websocket server.....");
                // client.subscribe("/topic/messages", (message) => {
                //     console.log("DATA WEBSOCKET NHẬN ĐƯỢC: ", message.body);
                // });
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            },
            debug: (str) => {
                console.log(str); // Bật debug để xem log
            },
        });

        client.activate(); // Kích hoạt kết nối

        return () => {
            if (client) {
                client.deactivate(); // Ngắt kết nối khi component unmount
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            // alert("Sent message to websocket");
            stompClient.publish({
                destination: "/app/sendMessage", // Đích đến trên server
                body: "Hello Websocket", // Nội dung message
            });
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(saveMyCoords(position.coords));
            },
            (error) => {
                console.error("Error fetching geolocation:", error);
            },
        );
    }, [dispatch]);
    useEffect(() => {
        const fetchRestaurant = async () => {
            const result = await getAllRestaurant();
            setAllRestaurant(result.payload);
        };

        fetchRestaurant();
    }, []);
    useEffect(() => {
        console.log("allRestaurant: ", allRestaurant);
    }, [allRestaurant]);
    const handleNext = () => {
        if (categoryRef.current) {
            setTestScroll(categoryRef.current?.scrollLeft);
            categoryRef.current.scrollBy({
                left: itemWidth + 16,
                behavior: "smooth",
            });
        }
    };
    const handleCloseModal = () => setOpenModal(false);
    const handleContinuePayment = () => {
        if (pendingPayment) {
            window.location.href = pendingPayment.checkoutUrl;
        }
    };
    const paymentStatus = useSelector((state) => state.payment.paymentStatus);
    console.log("paymentstatus", paymentStatus);
    const handlePrevious = () => {
        if (categoryRef.current) {
            setTestScroll(categoryRef.current?.scrollLeft);

            categoryRef.current.scrollBy({
                left: -itemWidth - 16,
                behavior: "smooth",
            });
        }
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

    useEffect(() => {
        if (categoryRef.current && categoryRef.current.firstChild) {
            const firstItem = categoryRef.current.firstChild;

            setItemWidth(firstItem.getBoundingClientRect().width);
        }
    }, [categories]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/restaurant-categories", {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.log("Fail to fetch categories!");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchRecommendedList = async () => {
            try {
                let response = {};
                if (user) {
                    // alert(user?.maSoNguoiDung);
                    const result = await axios.get(
                        `http://localhost:5000/recommend/online?user_id=${user.maSoNguoiDung}&top_n=10`,
                        // {
                        //     withCredentials: true,
                        // },
                    );
                    console.log("=================result of recommendations============: ", allRestaurant);
                    response.status = 200;
                    response.data = allRestaurant.filter((res) => {
                        console.log("ma SO NHA HANG", res.maSoNhaHang);
                        return result.data.recommendations.includes(res.maSoNhaHang);
                    });
                } else {
                    // alert("No user found, fetching default recommendations.");
                    response = await axios.get("http://localhost:8080/api/restaurants/recommended", {
                        withCredentials: true,
                    });
                }
                if (response.status === 200) {
                    setRecommendList(response.data);
                } else {
                    console.log("Fail to fetch categories!");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecommendedList();
    }, [user, allRestaurant]);

    // useEffect(() => {
    //     dispatch(logout());
    //     const getRecommendedList = async () => {
    //         const response = await axios.get("http://localhost:8080/api/restaurants/recommended", {
    //             withCredentials: true,
    //         });
    //         if (response.status === 200) {
    //             setRecommendedList(response.data);
    //         }
    //     };

    //     getRecommendedList();
    // }, []);

    const checkPendingPayment = () => {
        const pendingOrderString = localStorage.getItem("pendingOrder");
        if (!pendingOrderString) return; // Nếu không có đơn hàng nào, thoát

        const pendingOrder = JSON.parse(pendingOrderString); // Chuyển về object
        console.log("pendingOrder.orderCode:", pendingOrder);
        const distance = calculateDistance(myCoords, pendingOrder.lat, pendingOrder.lon);
        console.log("distance", distance);
        const elapsedTime = Date.now() - pendingOrder.timeStamp;

        if (elapsedTime >= 180000) {
            // Nếu đã quá hạn 3 phút
            localStorage.removeItem("pendingOrder");
            dispatch(
                paymentCallback({
                    status: "FAIL",
                    orderCode: pendingOrder.orderCode,
                    paymentCode: pendingOrder.orderCodePayOs,
                    distanceKm: distance,
                }),
            );
            sendMessage();
        } else {
            setPendingPayment(pendingOrder);
            setOpenModal(true);
        }
    };

    // Gọi hàm khi trang home load
    useEffect(() => {
        checkPendingPayment();
    }, []);

    const carouselRef = React.useRef(null);

    const next = () => {
        carouselRef.current.next();
    };

    const prev = () => {
        carouselRef.current.prev();
    };
    // console.log("recommenlist", recommendList);
    useEffect(() => {
        const handleScroll = () => {
            if (categoryRef.current?.scrollLeft !== 0) {
                setPreviousState(true);
            } else {
                setPreviousState(false);
            }
            if (
                categoryRef.current?.scrollLeft + categoryRef.current?.clientWidth >=
                categoryRef.current?.scrollWidth
            ) {
                setNextState(false);
            } else {
                setNextState(true);
            }
        };

        const refCurrent = categoryRef.current;

        refCurrent?.addEventListener("scroll", handleScroll);

        return () => {
            refCurrent?.removeEventListener("scroll", handleScroll);
        };
    }, [categoryRef.current?.scrollLeft]);
    //   useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const sessionId = urlParams.get("sessionId");
    //     const name = urlParams.get("name");
    //     const userId = urlParams.get("userId");
    //     if (sessionId) {
    //       localStorage.setItem("sessionId", sessionId);
    //       localStorage.setItem("userName", name);
    //       localStorage.setItem("userId", userId);
    //       // Xóa sessionId khỏi URL
    //       navigate("/home", { replace: true });
    //     }
    //   }, []);

    // Khi redirect về FE, gọi API để lấy thông tin user từ session
    const fetchUserInfo = async () => {
        try {
            console.log("Fetching user info...");

            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("userId");
            if (!userId) {
                setIsLoading(false);
                return;
            }

            dispatch(setStatusModalAuthentication({ openModal: false }));

            const response = await fetch(`http://localhost:8080/user-info?userId=${userId}`, {
                credentials: "include",
            });
            const data = await response.json();
            console.log("User:", data);

            dispatch(setUser(data));

            switch (data.userRole) {
                case "C":
                    dispatch(setUserRole("customer"));
                    break;
                case "O":
                    dispatch(setUserRole("owner"));
                    dispatch(setLoginRoute(true));
                    break;
                default:
                    dispatch(setUserRole("guest"));
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div style={{ position: "relative" }}>
            <div className={`home-header ${isScrolled ? "hidden" : "visible"}`}>
                <Search></Search>
            </div>
            <div className={`main-header ${isScrolled ? "visible" : "hidden"}`}>
                <Search></Search>
            </div>
            <div className="banner">
                <div>
                    <p className="banner__title">
                        Discover delicious dishes at your favorite restaurant <br></br> right now!
                    </p>
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
            </div>
            <p className="category-title">Danh Mục</p>
            <ul
                ref={categoryRef}
                className="category-list"
            >
                {categories.map((cate, index) => {
                    return (
                        <div
                            key={index}
                            className="category-link"
                        >
                            <CategoryItem
                                imgUrl={
                                    // cate.linkAnh ||
                                    "http://reviewvilla.vn/wp-content/uploads/2022/06/Top-20-nha-hang-Hoi-An-14.jpg"
                                }
                                name={cate.ten}
                            />
                        </div>
                    );
                })}
                <Tooltip
                    className="left-nav-btn"
                    title="previous"
                >
                    <Button
                        onClick={handlePrevious}
                        shape="circle"
                        disabled={!previousState}
                        icon={<FaAngleLeft />}
                    />
                </Tooltip>
                <Tooltip
                    className="right-nav-btn"
                    title="next"
                >
                    <Button
                        onClick={handleNext}
                        shape="circle"
                        icon={<FaAngleRight />}
                        disabled={
                            categoryRef.current?.scrollLeft + categoryRef.current?.clientWidth >=
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
                            <a
                                className="banner-link"
                                href="https://thefork.com"
                            >
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
                            <p className="characteristic-description">Giải pháp chất lượng cho câu hỏi ăn gì ở đâu.</p>
                        </li>
                        <li className="characteristic">
                            <div className="characteristic-icon">
                                <IoIosStar size={42} />
                                <IoIosStar size={42} />
                                <IoIosStar size={42} />
                            </div>
                            <h5 className="characteristic-content">Khách hàng đánh giá</h5>
                            <p className="characteristic-description">Đề xuất và đánh giá từ cộng đồng.</p>
                        </li>
                        <li className="characteristic">
                            <div className="characteristic-icon">
                                <MdOutlineLoyalty size={42} />
                            </div>
                            <h5 className="characteristic-content">Lợi ích độc quyền</h5>
                            <p className="characteristic-description">
                                Ưu đãi cho nhiều nhà hàng và nhiều lợi ích khác với chương trình khách hàng thân thiết
                                của chúng tôi.
                            </p>
                        </li>
                        <li className="characteristic">
                            <div className="characteristic-icon">
                                <FaCalendarCheck size={42} />
                            </div>
                            <h5 className="characteristic-content">Đặt bàn dễ dàng</h5>
                            <p className="characteristic-description">Nhanh chóng, miễn phí, 24/7.</p>
                        </li>
                    </ul>
                </div>
                <div className="about">
                    <h4 className="about__title">Về TheMeal</h4>
                    <p className="about__content">
                        TheMeal là nền tảng đặt chỗ và khám phá nhà hàng trực tuyến hàng đầu tại Việt Nam. Khám phá hơn
                        60.000 địa điểm ăn uống tuyệt vời nhất tại Hà Nội, Sài Gòn, Đà Nẵng, ​​Huế và nhiều nơi khác với
                        danh mục nhà hàng phong phú của chúng tôi cho bất kỳ nhu cầu nào của bạn. Tìm kiếm tình trạng
                        còn chỗ của nhà hàng bất kỳ lúc nào và với mức giá tốt nhất. Với hơn 20 triệu đánh giá đã xác
                        minh để hướng dẫn bạn, bạn có thể khám phá nhà hàng hoàn hảo trên TheMeal. <br />
                        <br /> Mỗi ngày và cho mọi dịp, bạn có thể tận hưởng mức giảm giá lên đến 50% cho hóa đơn thức
                        ăn và cũng kiếm được điểm thưởng gọi là Yums, mà bạn có thể đổi tại các nhà hàng tham gia.{" "}
                        <br />
                        <br /> Bạn có muốn ăn bún chả ở Hà Nội, ​​đồ ăn Nhật ở Sài Gòn hay muốn khám phá một nhà hàng ẩm
                        thực ở Huế không? Bạn có thích những quán ăn nhỏ kỳ quặc ở Đà Nẵng, háo hức với bữa sáng muộn
                        Chủ Nhật ở Vũng Tàu hay đang tìm kiếm một tâm trạng lãng mạn ở Đà Lạt không? Hãy làm theo hướng
                        dẫn và tìm những nhà hàng tuyệt vời nhất trên TheMeal!
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
                                <h4 className="owner-content__title">Đăng ký nhà hàng của bạn</h4>
                                <p className="owner-content__description">
                                    Giới thiệu về nhà hàng của bạn và chúng tôi sẽ liên lạc sớm nhất có thể
                                </p>
                                <a
                                    href="./register-restaurant"
                                    className="owner-content__action"
                                >
                                    XEM CHI TIẾT
                                </a>
                            </div>
                            <div className="manager-login">
                                <h4 className="owner-content__title">Đã liên kết với TheMeal</h4>
                                <p className="owner-content__description">
                                    Đăng nhập ngay để quản lý nhà hàng của bạn{" "}
                                </p>
                                <a
                                    href="https://thefork.com"
                                    className="owner-content__action"
                                >
                                    ĐĂNG NHẬP DÀNH CHO CHỦ NHÀ HÀNG{" "}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalRePayment
                open={openModal}
                handleClose={handleCloseModal}
                pendingPayment={pendingPayment}
                handleContinuePayment={handleContinuePayment}
            ></ModalRePayment>
        </div>
    );
}

export default Home;
