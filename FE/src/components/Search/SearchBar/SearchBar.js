import React, { useState } from "react";
import SearchBox from "../../Search/SearchBar/Search";
import Logo from "../../Logo";
import HeaderInfo from "../../../features/UserInfo/components/HeaderInfo";
import Authentication from "../../../features/Authentication/Authentication";
import { useSelector, useDispatch } from "react-redux";
import { setStatusModalAuthentication } from "../../../redux/features/authenticationSlice";
import ButtonLogin from "../../Button/ButtonLogin/ButtonLogin";
import avatar from "../../../assets/images/avatar.png";

const SearchBar = ({ border }) => {
    const dispatch = useDispatch();
    const showDrawer = () => {
        dispatch(setStatusModalAuthentication({ openModal: true }));
        // document.body.style.overflow = "hidden";
    };
    const open = useSelector((state) => state.authentication.openModal);
    const user = useSelector((state) => state.authentication.user);
    return (
        <>
            <div
                style={{
                    background: "white",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    padding: "10px",
                    justifyContent: "space-between",
                    flex: 1,
                }}
            >
                <div
                    style={{
                        paddingRight: "10px",
                    }}
                >
                    <Logo></Logo>
                </div>
                <SearchBox border={border} />
                {user ? (
                    <div
                        onClick={showDrawer}
                        style={{
                            cursor: "pointer",
                            // position: "absolute",
                            right: 0,
                            paddingRight: "5px",
                            // marginLeft: "15px",
                        }}
                    >
                        <HeaderInfo
                            userName={user ? user.hoTen : ""}
                            avatar={avatar}
                        />
                    </div>
                ) : (
                    <div style={{ paddingLeft: "60px" }}>
                        <ButtonLogin
                            text={"Đăng nhập"}
                            onClick={() => dispatch(setStatusModalAuthentication({ openModal: true }))}
                        ></ButtonLogin>
                    </div>
                )}
                <Authentication open={open}></Authentication>
            </div>
        </>
    );
};

export default SearchBar;
