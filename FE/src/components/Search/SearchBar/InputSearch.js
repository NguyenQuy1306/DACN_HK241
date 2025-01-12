import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ModalSearch from "../../Modal/ModalSearch/ModalSearch";
import {
  handleModal,
  openModalSearch2,
} from "../../../redux/features/searchSlice";
import "./InputSearch.css";
import { useDispatch, useSelector } from "react-redux";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function InputSearch({ width, placeholder, iCon, getOpen }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(0);
      if (active) {
        setOptions([...provinces]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);
  const openOf2 = useSelector(openModalSearch2);
  React.useEffect(() => {
    if (openOf2 == false) {
      // console.log("jdhfjhsdf");
      setOpen(false);
    }
  }, [openOf2]);

  const handleInputClick = () => {
    setOpen(true);
    dispatch(handleModal({ openModalSearch2: true }));
    if (placeholder === "Bàn muốn đặt chỗ đến đâu") {
      getOpen(true); // Pass the 'open' state value to the parent
    }
  };

  return (
    <div className={`InputSearchDiv ${open ? "active" : ""}`}>
      {/* {open && placeholder === "Bàn muốn đặt chỗ đến đâu" && (
        <div className="overlay" onClick={handleCloseModal}></div>
      )} */}
      {open && placeholder === "Bàn muốn đặt chỗ đến đâu" && (
        <div className="modalSearch_dropdown">
          <ModalSearch />
        </div>
      )}
      <Autocomplete
        sx={{ width: width }}
        open={placeholder === "Khu vực" ? open : false}
        onClose={placeholder === "Khu vực" ? () => setOpen(false) : undefined}
        options={placeholder === "Khu vực" ? options : []}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={handleInputClick}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {iCon}
                  {params.InputProps.startAdornment}
                </>
              ),
              style:
                open && placeholder === "Khu vực"
                  ? {
                      border: "2px solid #1c6359",
                      height: "42px",
                      top: "-2px",
                      left: "-3px",
                    }
                  : {
                      border: "none",
                      height: "37px",
                      borderRadius: "0px !important",
                    },
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove border from the outer fieldset (default border)
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}

const provinces = [
  { title: "An Giang" },
  { title: "Bà Rịa – Vũng Tàu" },
  { title: "Bắc Giang" },
  { title: "Bắc Kạn" },
  { title: "Bạc Liêu" },
  { title: "Bắc Ninh" },
  { title: "Bến Tre" },
  { title: "Bình Định" },
  { title: "Bình Dương" },
  { title: "Bình Phước" },
  { title: "Bình Thuận" },
  { title: "Cà Mau" },
  { title: "Cần Thơ" },
  { title: "Cao Bằng" },
  { title: "Đà Nẵng" },
  { title: "Đắk Lắk" },
  { title: "Đắk Nông" },
  { title: "Điện Biên" },
  { title: "Đồng Nai" },
  { title: "Đồng Tháp" },
  { title: "Gia Lai" },
  { title: "Hà Giang" },
  { title: "Hà Nam" },
  { title: "Hà Nội" },
  { title: "Hà Tĩnh" },
  { title: "Hải Dương" },
  { title: "Hải Phòng" },
  { title: "Hậu Giang" },
  { title: "Hòa Bình" },
  { title: "Hưng Yên" },
  { title: "Khánh Hòa" },
  { title: "Kiên Giang" },
  { title: "Kon Tum" },
  { title: "Lai Châu" },
  { title: "Lâm Đồng" },
  { title: "Lạng Sơn" },
  { title: "Lào Cai" },
  { title: "Long An" },
  { title: "Nam Định" },
  { title: "Nghệ An" },
  { title: "Ninh Bình" },
  { title: "Ninh Thuận" },
  { title: "Phú Thọ" },
  { title: "Phú Yên" },
  { title: "Quảng Bình" },
  { title: "Quảng Nam" },
  { title: "Quảng Ngãi" },
  { title: "Quảng Ninh" },
  { title: "Quảng Trị" },
  { title: "Sóc Trăng" },
  { title: "Sơn La" },
  { title: "Tây Ninh" },
  { title: "Thái Bình" },
  { title: "Thái Nguyên" },
  { title: "Thanh Hóa" },
  { title: "Thừa Thiên Huế" },
  { title: "Tiền Giang" },
  { title: "TP Hồ Chí Minh" },
  { title: "Trà Vinh" },
  { title: "Tuyên Quang" },
  { title: "Vĩnh Long" },
  { title: "Vĩnh Phúc" },
  { title: "Yên Bái" },
];
