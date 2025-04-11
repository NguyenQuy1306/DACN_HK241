import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import Result1 from "../../components/Search/Result/Result1";
import ListImage from "../../features/Detail/Image/ImageBox";
import DetailBox from "../../features/Detail/DetailBox/DetailBox";
import { useDispatch, useSelector } from "react-redux";
import { sendUserBehavior } from "../../redux/api";

const DetailRestaurant = () => {
    const [selectedPlace, setSelectedPlace] = useState(JSON.parse(localStorage.getItem("selectedPlace")));

    const startTimeRef = useRef(null);
    const { user } = useSelector((state) => state.authentication);
    useEffect(() => {
        startTimeRef.current = Date.now();
        return () => {
            const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
            if (timeSpent >= 5) {
                sendUserBehavior({
                    userId: user?.maSoNguoiDung,
                    restaurantId: selectedPlace?.maSoNhaHang,
                    timeSpent: timeSpent,
                    liked: false,
                });
            }
        };
    }, []);

    return (
        <>
            <SearchBar></SearchBar>
            <Result1
                keyword={"12"}
                count={12}
            ></Result1>

            <ListImage></ListImage>
            <DetailBox selectedPlace={selectedPlace}></DetailBox>
        </>
    );
};

export default DetailRestaurant;
