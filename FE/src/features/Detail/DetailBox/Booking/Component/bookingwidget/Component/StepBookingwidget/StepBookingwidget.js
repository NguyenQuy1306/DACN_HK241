import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setStatusModalAuthentication } from "../../../../../../../../redux/features/authenticationSlice";
import { setOpenModalPayment } from "../../../../../../../../redux/features/tableSlice";
import ButtonBookingwidget from "./Component/ButtonBookingwidget";
import "./StepBookingwidget.css";
const StepBookingwidget = ({
    timePicked,
    datePicked,
    personPicked,
    optionPicked,
    setDate,
    setTime,
    setPerson,
    setOption,
    setcloseDateDiv,
    setcloseTimeDiv,
    setclosePersonDiv,
    setcloseOptionDiv,
}) => {
    // const [chooseDate, setChooseDate] = useState();
    // const [chooseTime, setChooseTime] = useState();
    // const [choosePerson, setChoosePerson] = useState();
    // const [chooseOffer, setChooseOffer] = useState();
    const [activeDate, setActiveDate] = useState(true);
    const [activeTime, setActiveTime] = useState(false);
    const [activePerson, setActivePerson] = useState(false);
    const [activeOffer, setActiveOffer] = useState(false);
    const [lastClicked, setLastClicked] = useState("Date"); // New state to track the last clicked button
    const options = { month: "short", day: "numeric" };
    const formattedDate = datePicked ? datePicked.toLocaleDateString("en-US", options) : "";

    const getIconStyle = (isActive) => ({
        width: "0.86077em",
        height: "0.86077em",
        verticalAlign: "bottom",
        marginRight: "0.3rem",
        color: isActive ? "white" : "black", // White if the button was clicked, black otherwise
    });
    useEffect(() => {
        if (datePicked) {
            setActiveTime(true);
            setcloseDateDiv(true);
            setcloseTimeDiv(false);
            setclosePersonDiv(true);
            setcloseOptionDiv(true);

            setLastClicked("Time");
        }
        if (timePicked) {
            setActivePerson(true);
            setcloseTimeDiv(true);
            setclosePersonDiv(false);
            setcloseOptionDiv(true);

            setLastClicked("Guest");
        }
        if (personPicked) {
            setcloseTimeDiv(true);
            setclosePersonDiv(true);
            setcloseTimeDiv(true);

            if (openBookingWithMenu) {
                if (!user) {
                    dispatch(setStatusModalAuthentication({ openModal: true }));
                } else {
                    console.log("truetrue");
                    dispatch(setOpenModalPayment(true));
                }
            }
            setcloseOptionDiv(false);
            setLastClicked("Menu");
            setActiveOffer(true);
        }
        if (optionPicked) {
            setcloseTimeDiv(true);
            setclosePersonDiv(true);
            setcloseTimeDiv(true);
            // setCloseOptionDiv(true);
        }
    }, [datePicked, timePicked, personPicked]);
    const openBookingWithMenu = useSelector((state) => state.restaurant.openBookingWithMenu);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleOnClickButtonwidget = (type) => {
        // Set last clicked button
        if (type === "Date") {
            setDate(null);
            setTime(null);
            setPerson(null);
            setOption(null);
            setActiveTime(false);
            setActivePerson(false);
            setActiveOffer(false);

            setcloseDateDiv(false);
            setcloseTimeDiv(true);
            setclosePersonDiv(true);
            setcloseOptionDiv(true);

            // setLastClicked(type);
        } else if (type === "Time" && datePicked) {
            if (activeTime === false) {
                setActiveTime(!activeTime);
                // setcloseDateDiv(true);
            }
            setTime(null);
            setPerson(null);
            setOption(null);
            setcloseDateDiv(true);
            setclosePersonDiv(true);
            setcloseTimeDiv(false);

            setActivePerson(false);
            setActiveOffer(false);

            // setLastClicked(type);
        } else if (type === "Guest" && datePicked && timePicked) {
            setPerson(null);
            setOption(null);

            setclosePersonDiv(false);
            setcloseDateDiv(true);
            setcloseDateDiv(true);
            if (activePerson === false) {
                setActivePerson(!activePerson);
                setcloseTimeDiv(true);
            }
            // if (activeTime === true) {
            //   setLastClicked(type);
            // }
            setActiveOffer(false);
        } else if (type === "Menu" && datePicked && timePicked && personPicked) {
            if (activeOffer === false) {
                setActiveOffer(!activeOffer);
            }
            // if (activeTime === true && activePerson === true) {
            //   setLastClicked(type);
            // }
        }
    };

    return (
        <div className="StepBookingwidgetDiv">
            <div className="StepBookingwidgetDiv_H1">
                <div
                    className={`StepBookingwidgetDiv_H3 ${activeDate === true ? "active" : ""} ${
                        lastClicked === "Date" ? "lastClicked" : ""
                    }`} // Add lastClicked condition
                >
                    <ButtonBookingwidget
                        icon={!datePicked && <CalendarMonthIcon style={getIconStyle(activeDate)} />}
                        text={datePicked ? formattedDate : "Date"} // Show formatted date if activeDate is not null, otherwise show "Date"
                        onClick={() => handleOnClickButtonwidget("Date")}
                        colorText={activeDate ? "white" : "black"} // Change color based on activeDate
                    ></ButtonBookingwidget>

                    {activeTime === true && <hr className="hr-column" />}
                </div>

                <div
                    className={`StepBookingwidgetDiv_H3 ${activeTime === true ? "active" : ""} ${
                        lastClicked === "Time" && activeTime === true ? "lastClicked" : ""
                    }`} // Add lastClicked condition
                >
                    <ButtonBookingwidget
                        icon={
                            !timePicked && (
                                <AccessTimeFilledSharpIcon style={getIconStyle(activeTime)}></AccessTimeFilledSharpIcon>
                            )
                        }
                        text={timePicked ? timePicked : "Time"}
                        onClick={() => handleOnClickButtonwidget("Time")}
                        colorText={activeTime === true ? "white" : "black"}
                    ></ButtonBookingwidget>
                    {activePerson === true && activeTime === true && <hr className="hr-column" />}
                </div>

                <div
                    className={`StepBookingwidgetDiv_H3 ${
                        activePerson === true && activeTime === true ? "active" : ""
                    } ${lastClicked === "Guest" && activePerson === true && activeTime === true ? "lastClicked" : ""}`} // Add lastClicked condition
                >
                    <ButtonBookingwidget
                        icon={
                            !personPicked && (
                                <PersonIcon
                                    style={getIconStyle(activePerson === true && activeTime === true)}
                                ></PersonIcon>
                            )
                        }
                        text={personPicked ? `${personPicked} Guest` : "Guest"}
                        onClick={() => handleOnClickButtonwidget("Guest")}
                        colorText={activePerson === true && activeTime === true ? "white" : "black"}
                    ></ButtonBookingwidget>
                    {activeOffer === true && activePerson === true && activeTime === true && (
                        <hr className="hr-column" />
                    )}
                </div>

                <div
                    className={`StepBookingwidgetDiv_H3 ${
                        activeOffer === true && activePerson === true && activeTime === true ? "active" : ""
                    } ${
                        lastClicked === "Menu" && activeOffer === true && activePerson === true && activeTime === true
                            ? "lastClicked"
                            : ""
                    }`} // Add lastClicked condition
                >
                    <ButtonBookingwidget
                        icon={
                            <AcUnitOutlinedIcon
                                style={getIconStyle(
                                    activeOffer === true && activePerson === true && activeTime === true,
                                )}
                            ></AcUnitOutlinedIcon>
                        }
                        text={"Menu"}
                        colorText={
                            activeOffer === true && activePerson === true && activeTime === true ? "white" : "black"
                        }
                        onClick={() => handleOnClickButtonwidget("Menu")}
                    ></ButtonBookingwidget>
                </div>
            </div>
        </div>
    );
};
export default StepBookingwidget;
