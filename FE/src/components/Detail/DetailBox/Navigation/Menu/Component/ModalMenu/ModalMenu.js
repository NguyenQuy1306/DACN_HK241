import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomizedTables from "../TableInModalMenu/TableInModalMenu";
import AddIcon from "@mui/icons-material/Add";

import "./ModalMenu.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ combo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancelCreateMenu = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen} className="modal-modal-description_button">
        <AddIcon className="modal-modal-description_button_icon"></AddIcon>
        <span className="odal-modal-description_button_span"> Tạo menu </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Menu của bạn
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CustomizedTables combo={combo}></CustomizedTables>
          </Typography>
          <div className="modal-modal-description_button_div">
            <Button className="modal-modal-description_button">
              Đặt bàn với menu được tạo
            </Button>
            <Button
              className="modal-modal-description_button_cancel"
              onClick={() => handleCancelCreateMenu()}
            >
              Huỷ bỏ
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
