import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../../components/Search/SearchBar/SearchBar";
import Result1 from "../../components/Search/Result/Result1";
import ListImage from "../../features/Detail/Image/ImageBox";
import DetailBox from "../../features/Detail/DetailBox/DetailBox";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, sendUserBehavior } from "../../redux/api";
import { useParams } from "react-router-dom";

const DetailRestaurant = () => {
    const [selectedPlace, setSelectedPlace] = useState(JSON.parse(localStorage.getItem("selectedPlace")));
    const { id } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState([]);

    useEffect(() => {
        const fetchRestaurantInfo = async () => {
            try {
                const result = await getRestaurantById({ restaurantId: id });
                setRestaurantInfo(result.data.payload);
            } catch (error) {
                console.error("Failed to fetch restaurant info:", error);
            }
        };
        fetchRestaurantInfo();
    }, [id]);

    useEffect(() => {
        console.log("Restaurant Info:", restaurantInfo);
    }, [restaurantInfo]);

    const startTimeRef = useRef(null);
    const { user } = useSelector((state) => state.authentication);
    useEffect(() => {
        // startTimeRef.current = Date.now();
        // return () => {
        //     const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        //     if (timeSpent >= 5) {
        //         sendUserBehavior({
        //             userId: user?.maSoNguoiDung,
        //             restaurantId: selectedPlace?.maSoNhaHang,
        //             timeSpent: timeSpent,
        //             liked: false,
        //         });
        //     }
        // };

        // const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        // if (timeSpent >= 5) {
        // sendUserBehavior({
        //     userId: user?.maSoNguoiDung,
        //     restaurantId: selectedPlace?.maSoNhaHang,
        //     timeSpent: timeSpent,
        //     liked: false,
        // });
        // }
        const time = setTimeout(() => {
            sendUserBehavior({
                userId: user?.maSoNguoiDung,
                restaurantId: restaurantInfo?.maSoNhaHang,
                timeSpent: 5,
                liked: false,
            });
        }, 5000);
        return () => {
            clearTimeout(time);
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
