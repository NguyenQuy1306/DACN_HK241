import React, { useState, useEffect } from "react";
import "./TitleDetail.css";
import Tags from "./Tags/Tags";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RestaurantName from "./RestaurantName/RestaurantName";
import OtherInformation from "./OtherInformation/OtherInformation";
import PositionInTop from "./PositionInTop/PositionInTop";
import axios from "axios";
import { useSelector } from "react-redux";
import { getFavoriteList } from "../../../../redux/api";
import { Modal, Card, Row, Col } from "antd";

const TitleDetail = ({ selectedPlace }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteLists, setFavoriteLists] = useState([]);
    const [showSelectList, setShowSelectList] = useState(false);
    const { user } = useSelector((state) => state.authentication);

    const generateRandomGradient = () => {
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = (hue1 + Math.floor(Math.random() * 60) + 30) % 360;

        return `linear-gradient(135deg, hsl(${hue1}, 100%, 85%), hsl(${hue2}, 100%, 88%))`;
    };

    useEffect(() => {
        const fetchFavoriteLists = async () => {
            try {
                const response = await getFavoriteList({ userId: user?.maSoNguoiDung });
                setFavoriteLists(response);
            } catch (error) {
                console.error("Error fetching favorite lists:", error);
            }
        };
        fetchFavoriteLists();
    }, [user]);

    const handleFavoriteClick = () => {
        setShowSelectList(true);
    };

    const handleSelectFavoriteList = (listId) => {
        axios
            .post(`/api/favorite-lists/${listId}/restaurants/${selectedPlace.id}`)
            .then(() => {
                setIsFavorited(true);
                setShowSelectList(false);
            })
            .catch((err) => {
                alert("Không thể thêm nhà hàng vào danh sách: " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="TitleDetail_H1">
            <div className="TitleDetail_H2">
                <Tags />
                <div className="heart_favorite">
                    {isFavorited ? (
                        <FavoriteRoundedIcon
                            className="heart_favorite_button_icon1"
                            onClick={handleFavoriteClick}
                        />
                    ) : (
                        <FavoriteBorderRoundedIcon
                            className="heart_favorite_button_icon"
                            onClick={handleFavoriteClick}
                        />
                    )}
                </div>

                <Modal
                    title="Chọn danh sách yêu thích"
                    open={showSelectList}
                    onCancel={() => setShowSelectList(false)}
                    footer={null}
                >
                    <Row gutter={[16, 16]}>
                        {favoriteLists.map((list, index) => (
                            <Col
                                span={12}
                                key={list.id}
                            >
                                <Card
                                    hoverable
                                    onClick={() => handleSelectFavoriteList(list.id)}
                                    style={{
                                        cursor: "pointer",
                                        textAlign: "center",
                                        background: generateRandomGradient(),
                                        color: "#333",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                        transition: "transform 0.2s ease-in-out",
                                    }}
                                    bodyStyle={{ padding: "20px" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <strong>{list.ten}</strong>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal>

                <RestaurantName selectedPlace={selectedPlace} />
                <OtherInformation selectedPlace={selectedPlace} />
                <PositionInTop text={selectedPlace.loaiHinh} />
            </div>
        </div>
    );
};

export default TitleDetail;
