import React, { useState } from "react";
import "./CopyAddressButton.css"; // Import the CSS file
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyAddressButton = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(true);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="CopyAddressButtonDiv">
      {!copied && (
        <button
          className="CopyAddressButtonDiv_copy_button"
          onClick={handleCopyAddress}
        >
          <ContentCopyIcon className="CopyAddressButtonDiv_copy_button_icon"></ContentCopyIcon>
          <span>COPY ĐỊA CHỈ</span>
        </button>
      )}
      {copied && (
        <span className="CopyAddressButtonDiv_copy_button_copied">COPIED!</span>
      )}
    </div>
  );
};

export default CopyAddressButton;
