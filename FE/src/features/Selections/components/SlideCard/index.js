import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Carousel } from "antd";
import "./SlideCard.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import SelectionCard from "../SelectionCard";

function SlideCard({ title, actionTitle, actionUrl, cardList }) {
    const carouselRef = useRef(null);

    const next = () => {
        carouselRef.current.next();
    };

    const prev = () => {
        carouselRef.current.prev();
    };

    const sliceCardList = cardList.reduce(
        (acc, cur) => {
            if (acc[acc.length - 1].length < 3) {
                acc[acc.length - 1].push(cur);
            } else {
                acc.push([]);
                acc[acc.length - 1].push(cur);
            }
            return acc;
        },
        [[]],
    );

    return (
        <div className="slide-container">
            <div className="selection-header">
                <h3 className="selection-title">{title}</h3>

                <div>
                    {actionTitle && (
                        <a
                            href={actionUrl}
                            className="action-more"
                        >
                            {actionTitle}
                        </a>
                    )}

                    <Button
                        type="default"
                        onClick={prev}
                        size="large"
                        icon={<MdArrowBackIos />}
                        className="action-btn"
                    />
                    <Button
                        type="default"
                        onClick={next}
                        size="large"
                        icon={<MdArrowForwardIos />}
                        className="action-btn"
                    />
                </div>
            </div>
            <Carousel
                ref={carouselRef}
                dots={false}
            >
                {sliceCardList.map((ls) => (
                    <div className="card-list">{ls.map((card) => card)}</div>
                ))}
            </Carousel>
        </div>
    );
}

export default SlideCard;
