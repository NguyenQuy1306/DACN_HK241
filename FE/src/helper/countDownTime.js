import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularCountdownTimer = ({ targetDate, bookingTime }) => {
    const target = new Date(targetDate).getTime();
    const booking = new Date(bookingTime.split(".")[0]).getTime();
    const now = new Date().getTime();

    const totalSecondsRef = useRef(Math.max(0, Math.floor((target - now) / 1000)));

    const total = Math.max(0, Math.floor((target - booking) / 1000));

    const [remainingSeconds, setRemainingSeconds] = useState(totalSecondsRef.current);

    console.log("Tong thoi gian: ", total);
    console.log("Thoi gian con lai: ", remainingSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getPercentage = () => {
        console.log("Phan tram: ", (remainingSeconds / total) * 100);
        return (remainingSeconds / total) * 100;
    };

    const getColor = () => {
        const minutesLeft = remainingSeconds / 60;
        if (minutesLeft > 60) return "#4caf50"; // Green
        if (minutesLeft > 30) return "#ff9800"; // Orange
        return "#f44336"; // Red
    };

    const formatTime = () => {
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
                value={getPercentage()}
                text={formatTime()}
                styles={buildStyles({
                    textSize: "16px",
                    pathColor: getColor(),
                    textColor: getColor(),
                    trailColor: "#eee",
                    strokeLinecap: "round",
                })}
            />
        </div>
    );
};

export default CircularCountdownTimer;
