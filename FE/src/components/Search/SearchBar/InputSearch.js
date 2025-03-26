import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ModalSearch from "../../Modal/ModalSearch/ModalSearch";

import "./InputSearch.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsInMaps,
  saveThanhPho,
} from "../../../redux/features/restaurantSlice";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const InputSearch = ({ width, placeholder, iCon }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const bounds = useSelector((state) => state.restaurant.bounds);
  const time = useSelector((state) => state.restaurant.time);
  const date = useSelector((state) => state.restaurant.date);
  const people = useSelector((state) => state.restaurant.people);
  const currentPage = useSelector((state) => state.restaurant.currentPage);

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

  const handleInputClick = () => {
    setOpen(true);
  };

  return (
    <div className={`InputSearchDiv ${open ? "active" : ""}`}>
      {open && placeholder === "Bạn muốn đặt chỗ đến đâu" && (
        <div className="modalSearch_dropdown">
          <ModalSearch />
        </div>
      )}
      <Autocomplete
        sx={{ width: width }}
        open={placeholder === "Khu vực" ? open : false}
        onChange={(event, newValue) => {
          if (!bounds) return;

          const { ne, sw } = bounds;

          const params = {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
            page: currentPage,
            thanhPho: newValue.title,

            size: 10,
          };
          dispatch(saveThanhPho(newValue.title));
          if (time && date && people) {
            params.date = date;
            params.people = people;
            params.time = time;
          }
          dispatch(getRestaurantsInMaps(params));
        }}
        onClose={placeholder === "Khu vực" ? () => setOpen(false) : undefined}
        options={placeholder === "Khu vực" ? options : []}
        defaultValue={provinces.find((p) => p.title === "TP Hồ Chí Minh")}
        getOptionLabel={(option) => option.title}
        clearText="none"
        disableClearable
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
};

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
export default InputSearch;
