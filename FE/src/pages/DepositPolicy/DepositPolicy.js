import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { getDepositPolicy } from "../../redux/features/paymentSlice";
import { Bold } from "lucide-react";
const DepositPolicy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location_id = localStorage.getItem("selectedPlaceId");
  const depositPolicy = useSelector((state) => state.payment.depositPolicy);
  console.log("deposittt", depositPolicy);
  useEffect(() => {
    dispatch(getDepositPolicy({ restaurantId: location_id }));
  }, [dispatch, location_id]);
  const [selectedPlace, setSelectedPlace] = useState(
    JSON.parse(localStorage.getItem("selectedPlace"))
  );
  console.log("selectedPlace", selectedPlace);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Chính sách đặt chỗ tại nhà hàng{" "}
            {selectedPlace ? selectedPlace.ten : ""}
          </Typography>

          <Typography variant="body1" gutterBottom>
            Để đảm bảo chỗ ngồi tại nhà hàng, chúng tôi yêu cầu khách hàng đặt
            cọc trước. Số tiền đặt cọc sẽ được trừ vào hóa đơn thanh toán cuối
            cùng.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            1. Số tiền đặt cọc
          </Typography>
          <Typography variant="body2">
            - Đối với khách hàng đặt bàn không menu hoặc menu có giá trị nhỏ:{" "}
            <span style={{ fontWeight: "bold" }}>
              {depositPolicy ? depositPolicy.datCocToiThieu : ""}
              VNĐ.{" "}
            </span>{" "}
          </Typography>

          <Typography variant="body2">
            - Đối với đơn hàng có menu giá trị cao từ{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {depositPolicy
                ? depositPolicy.nguongApDungDatCocTheoPhanTram
                : ""}
              VNĐ
            </span>{" "}
            thì phải đặt cọc:{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {depositPolicy ? depositPolicy.phanTramCoc : ""} %{" "}
            </span>{" "}
            đơn hàng.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            2. Chính sách hoàn tiền giờ.
          </Typography>
          <Typography variant="body2">
            - Hoàn tiền 100% nếu hủy trước{" "}
            {depositPolicy ? depositPolicy.khoangThoiGianHoanCocToanBo : ""}{" "}
            giờ.
          </Typography>

          <Typography variant="body2">
            - Hoàn tiền 50% nếu hủy trước{" "}
            {depositPolicy
              ? depositPolicy.khoangThoiGianHoanCocKhongToanBo
              : ""}{" "}
            giờ.
          </Typography>

          <Typography variant="body2">
            - Không hoàn tiền nếu hủy sau{" "}
            {depositPolicy
              ? depositPolicy.khoangThoiGianHoanCocKhongToanBo
              : ""}{" "}
            giờ trước giờ đặt bàn.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            3. Điều kiện áp dụng
          </Typography>
          <Typography variant="body2">
            - Chỉ áp dụng cho các nhà hàng có chính sách đặt cọc.
          </Typography>
          <Typography variant="body2">
            - Quý khách vui lòng mang theo hóa đơn đặt cọc khi đến nhà hàng.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/home")}
          >
            Quay lại
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DepositPolicy;
